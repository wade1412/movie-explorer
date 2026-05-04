import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export const useFilter = () => {
  const [filterParams, setFilterParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      // Main query
      showType: filterParams.get("showType") || "movie",
      page: Number(filterParams.get("page")) || 1,

      // Filtering query
      sortBy: filterParams.get("sort_by") || "popularity.desc",
      withGenres: filterParams.get("with_genres") || "",

      // Votes query
      voteAverageRange: [
        filterParams.get("vote_average.gte") || "",
        filterParams.get("vote_average.lte") || "",
      ],
      voteCountRange: [
        filterParams.get("vote_count.gte") || "",
        filterParams.get("vote_count.lte") || "",
      ],
    }),
    [filterParams],
  );

  // Regular filters logic
  const updateFilter = useCallback(
    (key, value) => {
      setFilterParams((prev) => {
        // Delete key from params on empty value
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          value === 0
        )
          prev.delete(key);
        else prev.set(key, value);

        //reset page on filters change
        if (key !== "page") {
          prev.set("page", 1);
        }

        return prev;
      });
    },
    [setFilterParams],
  );

  const updateShowType = useCallback(
    () =>
      updateFilter("showType", filters.showType === "movie" ? "tv" : "movie"),
    [filters.showType, updateFilter],
  );

  const updatePage = useCallback(
    (newPage) => updateFilter("page", newPage),
    [updateFilter],
  );

  const updateSort = useCallback(
    (newSort) => updateFilter("sort_by", newSort),
    [updateFilter],
  );

  const updateGenres = useCallback(
    (selectedGenres) =>
      updateFilter(
        "with_genres",
        selectedGenres.length > 0 ? selectedGenres.join(",") : null,
      ),
    [updateFilter],
  );

  // Vote range update logic
  const updateVotes = useCallback(
    (keyGreater, keyLower, voteRange) => {
      if (!Array.isArray(voteRange) || voteRange.length !== 2) {
        throw new Error("Incorrect vote range data");
      }

      // MUI does min/max sorting itself, so just need to pass values in order
      setFilterParams((prev) => {
        // Greater than smaller value, lower than bigger value
        prev.set(keyGreater, voteRange[0]);
        prev.set(keyLower, voteRange[1]);
        prev.set("page", 1);

        return prev;
      });
    },
    [setFilterParams],
  );

  const updateVoteAverageRange = useCallback(
    (voteAverageRange) =>
      updateVotes("vote_average.gte", "vote_average.lte", voteAverageRange),
    [updateVotes],
  );

  const updateVoteCountRange = useCallback(
    (voteCountRange) =>
      updateVotes("vote_count.gte", "vote_count.lte", voteCountRange),
    [updateVotes],
  );

  //Clear filters to default state
  const clearFilters = useCallback(() => {
    setFilterParams({
      showType: "movie",
      sortBy: "popularity.desc",
      page: 1,
    });
  }, [setFilterParams]);

  return {
    filters,
    updateShowType,
    updatePage,
    updateSort,
    updateGenres,
    updateVoteAverageRange,
    updateVoteCountRange,
    clearFilters,
  };
};
