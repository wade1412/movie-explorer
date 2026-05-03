import { useEffect, useState } from "react";
import { getFilteredShows, getGenres } from "../services/api";

export const useDiscover = (
  showType,
  page,
  sortBy,
  withGenres,
  voteAverage,
  voteCount,
) => {
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

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
      try {
        //start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        const params = new URLSearchParams({
          sort_by: sortBy,
          with_genres: withGenres,
          "vote_average.gte": voteAverage,
          "vote_count.gte": voteCount,
          page: String(page || 1),
          include_adult: false,
        });

        console.log(params.toString());

        const { results, total_pages } = await getFilteredShows(
          showType,
          params,
          signal,
        );

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
  }, [showType, sortBy, withGenres, page, voteAverage, voteCount]);

  //Fetch Genres List
  useEffect(() => {
    const getGenresList = async () => {
      try {
        const genres = await getGenres(showType);

        setGenresList(genres);
      } catch (err) {
        setGenresList([]);
        setError({
          isError: true,
          message: err.message || "Something went wrong",
        });
      }
    };

    getGenresList();
  }, [showType]);

  let status;
  if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else status = "success";

  return {
    movies,
    genresList,
    page,
    totalPages,
    status,
    errorMessage: error.message,
  };
};
