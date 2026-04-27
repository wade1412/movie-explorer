import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useMovies = (query, fetchFunction) => {
  //states for search result, error/loading status
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //debounced search
  const debouncedQuery = useDebounce(query);

  //check if the user already started typing in input to prevent false empty state
  useEffect(() => {
    if (!query.trim()) {
      //return early on empty query
      setIsLoading(false);
      setMovies([]);
      return;
    }

    const isWaitingForDebounce = query.trim() !== debouncedQuery.trim();

    if (isWaitingForDebounce) {
      //start loading once the debounced value and real value dont match
      setIsLoading(true);
      setMovies([]);
    }
  }, [query, debouncedQuery]);

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

        const moviesResult = await fetchFunction(debouncedQuery.trim(), signal);

        if (!ignore) {
          setMovies(moviesResult || []);
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

    //abort previous request on re-run effect
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [debouncedQuery, fetchFunction]);

  let status;
  if (!query.trim()) status = "idle";
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
