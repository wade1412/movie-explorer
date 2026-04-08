const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

export const searchMovies = async (query, signal) => {
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
    throw new Error(data.message || data.status_message || "Search HTTP error");
  }

  return data.results || [];
};

export const getMovieById = async (id, signal) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    signal,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.status_message || "Movie fetch error");
  }

  return data;

  //no need to catch AbortError here, because it is handled in
  //useMovieDetails hook
};
