import { useEffect, useState } from "react";
import { getShowById } from "../services/api";

export const useShowDetails = (showType, id) => {
  // States for movie, loading, error status
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const movieDetails = await getShowById(showType, id);

        setShow(movieDetails || null);
      } catch (err) {
        setShow(null);
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
  else if (show === null) status = "not-found";
  else status = "success";

  return {
    show,
    status,
    errorMessage,
  };
};
