import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchMovies } from "../services/api";

export const useMoviesSearch = (query, page) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  //Debounced query change
  const debouncedQuery = useDebounce(query);

  //Start loading right after query changes to avoid false empty state
  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
    }
  }, [query]);

  //Scroll to top on new page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // --- Main Fetching Logic ---
  useEffect(() => {
    //abort contoller for race condition control
    const controller = new AbortController();
    const signal = controller.signal;

    const getMovies = async () => {
      if (!debouncedQuery.trim()) {
        //prevent fetch on empty input, clear error and movies, finish loading
        setMovies([]);
        setTotalPages(1);
        setError({ isError: false, message: "" });
        return;
      }

      try {
        //start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        const params = new URLSearchParams({
          query: debouncedQuery,
          page: String(page || 1),
          include_adult: false,
        });

        const { results, total_pages } = await searchMovies(params, signal);

        setMovies(results || []);

        setTotalPages(Math.min(total_pages, 100));
      } catch (err) {
        if (err.name === "AbortError") return;

        setMovies([]);
        setError({
          isError: true,
          message: err.message || "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();

    //abort previous request on component unmount
    return () => {
      controller.abort();
    };
  }, [debouncedQuery, page]);

  let status;
  if (!query.trim()) status = "idle";
  else if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else if (movies.length === 0) status = "empty";
  else status = "success";

  return {
    movies,
    page,
    totalPages,
    status,
    errorMessage: error.message,
  };
};
