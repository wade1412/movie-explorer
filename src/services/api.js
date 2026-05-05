import { BASE_URL } from "./constants";

const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

const getShowsByParams = async (
  apiType,
  showType = "movie",
  params,
  signal,
) => {
  let endpoint;

  // Getting endpoint based on apiType
  if (!apiType) {
    endpoint = `${showType}`;
  } else if (apiType === "trending") {
    endpoint = `${apiType}/${showType}/week`;
  } else if (apiType === "getId") {
    endpoint = `${showType}/${params}`;
  } else {
    endpoint = `${apiType}/${showType}`;
  }

  // Add query string to URL, if it isnt getId
  const queryString = apiType !== "getId" && params ? `?${params}` : "";

  const fetchURL = `${BASE_URL}/${endpoint}${queryString}`;

  const res = await fetch(fetchURL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    signal,
  });

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

export const getMovieById = async (id, signal = null) =>
  getShowsByParams("getId", "movie", id, signal);

export const getGenres = async (showType) => {
  const res = await fetch(`${BASE_URL}/genre/${showType}/list?language=en`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.status_message || "Fetch Genre error");
  }

  return data.genres;
};
