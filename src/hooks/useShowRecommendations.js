import { useEffect, useState } from "react";
import { getShowRecommendations } from "../services/api";

export const useShowRecommendations = (showType, id) => {
  const [recommendations, setRecommendations] = useState([]);
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

        const { results } = await getShowRecommendations(showType, id, signal);

        setRecommendations(results || []);
      } catch (err) {
        if (err.name === "AbortError") return;

        setRecommendations([]);
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
  }, [showType, id]);

  let status;
  if (isLoading) status = "loading";
  else if (error.isError) status = "error";
  else status = "success";

  return {
    recommendations,
    status,
    errorMessage: error.message,
  };
};
