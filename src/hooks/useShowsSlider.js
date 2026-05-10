import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";

export const useShowsSlider = (showType, timePeriod) => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const signal = controller.signal;

    const getTrending = async () => {
      try {
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        const trendingRes = await getTrendingMovies(
          showType,
          timePeriod,
          signal,
        );

        setShows(trendingRes);
      } catch (err) {
        if (err.name === "AbortError") return;

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

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [showType, timePeriod]);

  let status;

  if (isLoading) {
    status = "loading";
  } else if (isError) {
    status = "error";
  } else {
    status = "success";
  }

  return {
    movies: shows,
    status,
    errorMessage,
  };
};
