const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

export const searchMovies = async (query, signal) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        signal,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || data.status_message || "Search HTTP error",
      );
    }

    return data.results || [];
  } catch (err) {
    if (err.name === "AbortError") {
      return [];
    } else {
      console.error("Search fetch failed:", err);
      throw err;
    }
  }
};
