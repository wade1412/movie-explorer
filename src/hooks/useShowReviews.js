import { useEffect, useState } from "react";
import { getShowReviews } from "../services/api";

export const useShowReviews = (showType, id, page) => {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });

  // --- Main Fetching Logic ---
  useEffect(() => {
    // In case user quicky jumps to another details page - abort previous request to render correct reviews
    const controller = new AbortController();
    const signal = controller.signal;

    const getReviews = async () => {
      try {
        // Start loading on fetch
        setIsLoading(true);
        setError({ isError: false, message: "" });

        // Passing params as regular object for desctructuring in api, because we need to access id and page in different parts of fetch URL
        const params = { id, page };

        const { results, total_pages } = await getShowReviews(
          showType,
          params,
          signal,
        );

        setReviews(results || []);

        if (results.length > 0) {
          setTotalPages(total_pages);
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        setReviews([]);
        setError({
          isError: true,
          message: err.message || "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();

    return () => controller.abort();
  }, [showType, id, page]);

  let status;
  if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else status = "success";

  return {
    reviews,
    status,
    totalPages,
    errorMessage: error.message,
  };
};
