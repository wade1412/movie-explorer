import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { getHomeShowsList } from "../services/api";

export const useHomeList = (showType, listType) => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  //Debounced list change
  const debouncedListType = useDebounce(listType, 250);

  // --- Main Fetching Logic ---
  useEffect(() => {
    //abort contoller for race condition control
    const controller = new AbortController();
    const signal = controller.signal;

    const getMovies = async () => {
      try {
        //start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        const { results } = await getHomeShowsList(
          showType,
          debouncedListType,
          signal,
        );

        setShows(results || []);
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

    //abort previous request on component unmount
    return () => {
      controller.abort();
    };
  }, [showType, debouncedListType]);

  let status;
  if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else status = "success";

  return {
    shows,
    status,
    errorMessage: error.message,
  };
};
