import { BASE_URL, TRENDING_PARAMS } from "./constants";

const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

const getShowsByParams = async (apiType, showType, params, signal) => {
  let fetchURL;
  if (apiType === "trending") {
    fetchURL = `${BASE_URL}/${apiType}/${showType}/week`;
  } else {
    fetchURL = `${BASE_URL}/${apiType}/${showType}?${params}`;
  }

  const res = await fetch(fetchURL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    signal,
  });
  console.log(`${BASE_URL}/${apiType}/${showType}?${params}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.status_message || "Search HTTP error");
  }

  //for trending movies we dont need pages, return results only
  return apiType === "trending" ? data.results : data;
};

export const searchMovies = (params, signal) =>
  getShowsByParams("search", "movie", params, signal);

export const getFilteredShows = (showType, params, signal) =>
  getShowsByParams("discover", showType, params, signal);

export const getTrendingMovies = (params = "", signal = null) => {
  return getShowsByParams("trending", "movie", params, signal);
};

export const getGenres = async (showType) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/${showType}/list?language=en`,
    {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.status_message || "Fetch Genre error");
  }

  return data.genres;
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
