import { useSearchParams } from "react-router";
import FilterBar from "../components/Discover/FilterBar";

import { useMoviesFilter } from "../hooks/useMoviesFilter";
import MovieList from "../components/MoviesList/MovieList";
import ListControls from "../components/MoviesList/ListControls";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function DiscoverMoviePage() {
  const [filterParams, setFilterParams] = useSearchParams();

  const sortBy = filterParams.get("sort_by") || "popularity.desc";
  const page = Number(filterParams.get("page")) || 1;

  const { movies, totalPages, status, errorMessage } = useMoviesFilter(
    sortBy,
    page,
  );

  const handleSortByChange = (newSort) => {
    setFilterParams((prev) => {
      prev.set("sort_by", newSort);
      prev.set("page", 1);
      return prev;
    });
    console.log(newSort);
  };
  const handlePageChange = (newPage) => {
    setFilterParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  };

  return (
    <motion.section
      className=" flex flex-col gap-6 py-2 mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <FilterBar onSortChange={handleSortByChange} currentSort={sortBy} />

      <MovieList
        movies={movies}
        page={page}
        totalPages={totalPages}
        changePageNumber={handlePageChange}
        status={status}
        errorMessage={errorMessage}
      />
    </motion.section>
  );
}

export default DiscoverMoviePage;
