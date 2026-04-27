import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";

export const useTrending = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const getTrending = async () => {
      try {
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        const trendingRes = await getTrendingMovies();

        setMovies(trendingRes);
      } catch (err) {
        if (!ignore) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(err.message || "Couldn't get popular movies");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    getTrending();

    return () => (ignore = true);
  }, []);

  let status;

  if (isLoading) {
    status = "loading";
  } else if (isError) {
    status = "error";
  } else {
    status = "success";
  }

  return {
    movies,
    status,
    errorMessage,
  };
};
