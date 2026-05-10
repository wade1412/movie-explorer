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

  const [voteAverageGte, voteAverageLte] = voteAverageRange;
  const [voteCountGte, voteCountLte] = voteCountRange;

  // Data states
  const [shows, setShows] = useState([]);
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
          "vote_average.gte": voteAverageGte,
          "vote_average.lte": voteAverageLte,
          "vote_count.gte": voteCountGte,
          "vote_count.lte": voteCountLte,
          page: String(page || 1),
          include_adult: false,
        });

        const { results, total_pages } = await getFilteredShows(
          showType,
          params,
          signal,
        );

        setShows(results || []);

        setTotalPages(Math.min(total_pages, MAX_PAGES));
      } catch (err) {
        if (err.name === "AbortError") return;

        setShows([]);
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
  }, [
    showType,
    sortBy,
    withGenres,
    page,
    voteAverageGte,
    voteAverageLte,
    voteCountGte,
    voteCountLte,
  ]);

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
    shows,
    genresList,
    totalPages,
    status,
    errorMessage: error.message,
  };
};
