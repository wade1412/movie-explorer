import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";

export const useMovieDetails = (id) => {
  //states for movie, loading,error status
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    //flag to check is the current effect active
    let ignore = false;

    const getMovie = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        setErrorMessage("");

        const movieDetails = await getMovieById(id, signal);

        if (!ignore) {
          setMovie(movieDetails);
        }
      } catch (err) {
        //handle abortError
        if (err.name === "AbortError") return;

        //change states only if the current effect is active
        if (!ignore) {
          setMovie(null);
          setIsError(true);
          setErrorMessage(err.message || "Something went wrong");
        }
        return;
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    getMovie();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [id]);

  let status;
  if (isLoading) status = "loading";
  else if (isError) status = "error";
  else if (movie === null) status = "not-found";
  else status = "success";

  return {
    movie,
    status,
    errorMessage,
  };
};
