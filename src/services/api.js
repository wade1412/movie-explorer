const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

export const getTrendingMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.status_message || "Get popular error");
  }

  return data.results || [];
};

export const searchMovies = async (params, signal) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?${params}`,
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

  return data;
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
