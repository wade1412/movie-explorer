export const BASE_URL = "https://api.themoviedb.org/3";
export const TRENDING_PARAMS = new URLSearchParams({
  include_adult: false,
  include_video: true,
  language: "en-US",
  page: 1,
  sort_by: "popularity.desc",
});
