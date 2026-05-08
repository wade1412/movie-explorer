import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { getHomeMoviesList } from "../services/api";

export const useHomeMoviesList = (listType) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  //Debounced list change
  const debouncedListType = useDebounce(listType, 250);

  // --- Main Fetching Logic ---
  useEffect(() => {
    //abort contoller for race condition control
    const controller = new AbortController();
    const signal = controller.signal;

    const getMovies = async () => {
      try {
        //start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        const { results } = await getHomeMoviesList(debouncedListType, signal);

        console.log(results);

        setMovies(results || []);
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
  }, [debouncedListType]);

  let status;
  if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else if (movies.length === 0) status = "empty";
  else status = "success";

  return {
    movies,
    status,
    errorMessage: error.message,
  };
};
