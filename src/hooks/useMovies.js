import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { searchMovies } from "../services/api";

export const useMovies = (query) => {
  //states for search result, error/loading status
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //debounced search
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    //abort contoller for race condition control
    const controller = new AbortController();
    const signal = controller.signal;

    const getMovies = async () => {
      try {
        //clean previous states before new fetch
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        const moviesResult = await searchMovies(debouncedQuery, signal);

        setMovies(moviesResult);
      } catch (err) {
        setMovies([]);
        setIsError(true);
        setErrorMessage(err.message || "Something went wrong");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    if (!debouncedQuery.trim()) {
      //prevent fetch on empty input and clear movies
      //no need to reset errors and loading state here
      //because status will return idle
      setMovies([]);
      return;
    }

    getMovies();

    //abort prev. request on re-run effect
    return () => controller.abort();
  }, [debouncedQuery]);

  let status;
  if (!debouncedQuery.trim()) status = "idle";
  else if (isLoading) status = "loading";
  else if (isError) status = "error";
  else if (movies.length === 0) status = "empty";
  else status = "success";

  return {
    movies,
    status,
    errorMessage,
  };
};
