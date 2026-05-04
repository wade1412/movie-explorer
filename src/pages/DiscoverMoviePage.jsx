import { useDiscover } from "../hooks/useDiscover";
import { useFilter } from "../hooks/useFilter";

import FilterBar from "../components/Discover/FilterBar";
import MovieList from "../components/MoviesList/MovieList";
import ListControls from "../components/MoviesList/ListControls";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function DiscoverMoviePage() {
  // Join all actions into filterActions obj
  const { filters, ...filterActions } = useFilter();

  const { movies, genresList, totalPages, status, errorMessage } =
    useDiscover(filters);

  return (
    <motion.section
      className="mx-auto flex flex-col gap-6 py-2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <FilterBar filters={filters} genresList={genresList} {...filterActions} />

      <MovieList
        movies={movies}
        page={filters.page}
        totalPages={totalPages}
        changePageNumber={filterActions.updatePage}
        status={status}
        errorMessage={errorMessage}
      />
    </motion.section>
  );
}

export default DiscoverMoviePage;
