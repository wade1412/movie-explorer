export const BASE_URL = "https://api.themoviedb.org/3";
export const TRENDING_PARAMS = new URLSearchParams({
  include_adult: false,
  include_video: true,
  language: "en-US",
  page: 1,
  sort_by: "popularity.desc",
});

export const SORT_OPTIONS = {
  movie: [
    { value: "original_title", label: "Original Title" },
    { value: "popularity", label: "Popularity" },
    { value: "revenue", label: "Revenue" },
    { value: "primary_release_date", label: "Release Date" },
    { value: "title", label: "Title" },
    { value: "vote_average", label: "Vote Average" },
    { value: "vote_count", label: "Vote Count" },
  ],
  tv: [
    { value: "first_air_date", label: "First Air Date" },
    { value: "name", label: "Name" },
    { value: "original_name", label: "Original Name" },
    { value: "popularity", label: "Popularity" },
    { value: "vote_average", label: "Vote Average" },
    { value: "vote_count", label: "Vote Count" },
  ],
};
