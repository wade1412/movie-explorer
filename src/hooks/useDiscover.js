import { useEffect, useState } from "react";
import { getFilteredShows, getGenres } from "../services/api";

const MAX_PAGES = 100;

export const useDiscover = (filters) => {
  // Destructuring filters
  const {
    showType,
    page,
    sortBy,
    withGenres,
    voteAverageRange,
    voteCountRange,
  } = filters;

  // Data states
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  //Status states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  // Scroll to top on new page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ----- Main Fetching Logic -----
  useEffect(() => {
    // Abort contoller for race condition control
    const controller = new AbortController();
    const signal = controller.signal;

    const getMovies = async () => {
      try {
        // Start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        // Set params based on received filters
        const params = new URLSearchParams({
          sort_by: sortBy,
          with_genres: withGenres,
          "vote_average.gte": voteAverageRange[0],
          "vote_average.lte": voteAverageRange[1],
          "vote_count.gte": voteCountRange[0],
          "vote_count.lte": voteCountRange[1],
          page: String(page || 1),
          include_adult: false,
        });

        const { results, total_pages } = await getFilteredShows(
          showType,
          params,
          signal,
        );

        setMovies(results || []);

        setTotalPages(Math.min(total_pages, MAX_PAGES));
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

    // Abort previous request on component unmount
    return () => {
      controller.abort();
    };
  }, [showType, sortBy, withGenres, page, voteAverageRange, voteCountRange]);

  // Fetch Genres List
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

  const status = isLoading ? "loading" : error.isError ? "error" : "success";

  return {
    movies,
    genresList,
    totalPages,
    status,
    errorMessage: error.message,
  };
};
