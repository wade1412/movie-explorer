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

export const VOTE_AVERAGE_OPTIONS = [
  { value: 5.0, label: "Low" },
  { value: 6.0, label: "Okay" },
  { value: 7.0, label: "Medium" },
  { value: 8.0, label: "High" },
];

export const VOTE_COUNT_OPTIONS = [
  { value: 500, label: "Low" },
  { value: 1000, label: "Okay" },
  { value: 5000, label: "High" },
  { value: 10000, label: "Very High" },
];
