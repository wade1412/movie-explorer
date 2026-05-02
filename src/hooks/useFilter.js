import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const useFilter = () => {
  const [filterParams, setFilterParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      //Main query
      showType: filterParams.get("showType") || "movie",
      page: Number(filterParams.get("page")) || 1,

      //Filtering query
      sortBy: filterParams.get("sort_by") || "popularity.desc",
      withGenres: filterParams.get("with_genres") || "",
      voteAverage: filterParams.get("vote_average.gte") || "",
      voteCount: filterParams.get("vote_count.gte") || "",
    }),
    [filterParams],
  );

  const updateFilter = (key, value) => {
    setFilterParams((prev) => {
      if (value === "" || value === null || value === undefined || value === 0)
        prev.delete(key);
      else prev.set(key, value);

      if (key !== "page") {
        prev.set("page", 1);
      }

      return prev;
    });
  };

  const updateShowType = () =>
    updateFilter("showType", filters.showType === "movie" ? "tv" : "movie");

  const updatePage = (newPage) => updateFilter("page", newPage);

  const updateSort = (newSort) => updateFilter("sort_by", newSort);

  const updateGenres = (selectedGenres) =>
    updateFilter(
      "with_genres",
      selectedGenres.length > 0 ? selectedGenres.join(",") : null,
    );

  const updateVoteAverage = (voteAverage) =>
    updateFilter("vote_average.gte", voteAverage);
  const updateVoteCount = (voteCount) =>
    updateFilter("vote_count.gte", voteCount);

  const clearFilters = () => {
    setFilterParams({});
  };

  return {
    ...filters,
    updateShowType,
    updatePage,
    updateSort,
    updateGenres,
    updateVoteAverage,
    updateVoteCount,
    clearFilters,
  };
};
