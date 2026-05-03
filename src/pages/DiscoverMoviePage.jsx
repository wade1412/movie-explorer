import FilterBar from "../components/Discover/FilterBar";
import { useDiscover } from "../hooks/useDiscover";
import MovieList from "../components/MoviesList/MovieList";
import ListControls from "../components/MoviesList/ListControls";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import ShowSelect from "../components/Discover/ShowSelect";
import { useFilter } from "../hooks/useFilter";
import ListButton from "../components/MoviesList/ListButton";

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
      className="mx-auto flex flex-col gap-6 py-2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4 text-lg">
        <ShowSelect showType={showType} toggleShowType={updateShowType} />
        <FilterBar
          showType={showType}
          currentSort={sortBy}
          onSortChange={updateSort}
          genresList={genresList}
          selectedGenres={withGenres}
          setSelectedGenres={updateGenres}
          updateVoteAverage={updateVoteAverage}
          updateVoteCount={updateVoteCount}
        />
        <ListButton
          style={` text-dark-blue-100 font-semibold rounded-xl px-6 py-2 bg-dark-blue-800 border-2 border-dark-blue-600 hover:bg-dark-blue-400 cursor-pointer hover:-translate-y-1 hover:border-dark-blue-900 hover:text-white transition-all`}
          text="Clear"
          handleClick={clearFilters}
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
