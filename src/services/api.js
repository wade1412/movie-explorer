const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

export const getTrendingMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc",
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

const getMoviesByParams = async (apiType, params, signal) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/${apiType}/movie?${params}`,
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

export const searchMovies = (params, signal) =>
  getMoviesByParams("search", params, signal);

export const getFilteredMovies = (params, signal) =>
  getMoviesByParams("discover", params, signal);

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
