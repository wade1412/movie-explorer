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

    //flag to check is the current effect active
    let ignore = false;

    const getMovies = async () => {
      try {
        //clean previous states before new fetch
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        const moviesResult = await searchMovies(debouncedQuery.trim(), signal);

        if (!ignore) {
          setMovies(moviesResult);
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        //change states only if the current effect is active
        if (!ignore) {
          setMovies([]);
          setIsError(true);
          setErrorMessage(err.message || "Something went wrong");
          return;
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    if (!debouncedQuery.trim()) {
      //prevent fetch on empty input and clear error and movies
      setMovies([]);
      setIsError(false);
      setErrorMessage("");
      return;
    }

    getMovies();

    //abort prev. request on re-run effect
    return () => {
      ignore = true;
      controller.abort();
    };
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
