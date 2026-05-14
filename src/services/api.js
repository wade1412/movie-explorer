import { BASE_URL } from "./constants";

const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;

const getShowsByParams = async (
  apiType,
  showType = "movie",
  params,
  signal,
) => {
  let endpoint;
  let query = "";

  // Getting endpoint and query based on apiType
  switch (apiType) {
    case "trending":
      // trending/{movie / tv show}/{time period}
      endpoint = `trending/${showType}/${params}`;
      break;
    case "noApi":
      // {movie id / list type}
      endpoint = `${showType}/${params}`;
      break;
    case "reviews":
      // {showType}/{id}/reviews?{query}
      endpoint = `${showType}/${params.id}/reviews`;
      query = `?page=${params.page}`;
      break;
    case "recommendations":
      endpoint = `${showType}/${params}/recommendations`;
      query = "";
      break;
    case "search":
    case "discover":
      endpoint = `${apiType}/${showType}`;
      query = `?${params}`;
      break;
    case null:
    case undefined:
      endpoint = showType;
      query = params ? `?${params}` : "";
      break;
    default:
      endpoint = `${apiType}/${showType}`;
      query = params ? `?${params}` : "";
  }

  const fetchURL = `${BASE_URL}/${endpoint}${query}`;

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

  // For trending movies we dont need pages, return results only
  return apiType === "trending" ? data.results : data;
};

export const searchShows = (showType, params, signal) =>
  getShowsByParams("search", showType, params, signal);

export const getFilteredShows = (showType, params, signal) =>
  getShowsByParams("discover", showType, params, signal);

export const getTrendingMovies = (showType, timePeriod, signal) => {
  return getShowsByParams("trending", showType, timePeriod, signal);
};

export const getHomeShowsList = (showType, listType, signal) =>
  getShowsByParams("noApi", showType, listType, signal);

export const getShowById = async (showType, id, signal = null) =>
  getShowsByParams("noApi", showType, id, signal);

export const getShowReviews = async (showType, params, signal) =>
  getShowsByParams("reviews", showType, params, signal);

export const getShowRecommendations = async (showType, id, signal) =>
  getShowsByParams("recommendations", showType, id, signal);

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
