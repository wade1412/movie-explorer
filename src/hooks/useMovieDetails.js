import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";

export const useMovieDetails = (id) => {
  // States for movie, loading, error status
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const movieDetails = await getMovieById(id);

        setMovie(movieDetails || null);
      } catch (err) {
        setMovie(null);
        setIsError(true);
        setErrorMessage(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
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
