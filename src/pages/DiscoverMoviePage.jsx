import FilterBar from "../components/Discover/FilterBar";
import { useDiscover } from "../hooks/useDiscover";
import MovieList from "../components/MoviesList/MovieList";
import ListControls from "../components/MoviesList/ListControls";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import ShowSelect from "../components/Discover/ShowSelect";
import { useFilter } from "../hooks/useFilter";

function DiscoverMoviePage() {
  const {
    filters,
    updateShowType,
    updatePage,
    updateSort,
    updateGenres,
    updateVoteAverage,
    updateVoteCount,
    clearFilters,
  } = useFilter();

  const { showType, page, sortBy, withGenres, voteAverage, voteCount } =
    filters;

  const { movies, genresList, totalPages, status, errorMessage } = useDiscover(
    showType,
    page,
    sortBy,
    withGenres,
  );

  return (
    <motion.section
      className=" flex flex-col gap-6 py-2 mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4 items-center">
        <ShowSelect showType={showType} toggleShowType={updateShowType} />
        <FilterBar
          showType={showType}
          selectedGenres={withGenres}
          setSelectedGenres={updateGenres}
          genresList={genresList}
          onSortChange={updateSort}
          currentSort={sortBy}
        />
      </div>

      <MovieList
        movies={movies}
        page={page}
        totalPages={totalPages}
        changePageNumber={updatePage}
        status={status}
        errorMessage={errorMessage}
      />
    </motion.section>
  );
}

export default DiscoverMoviePage;
