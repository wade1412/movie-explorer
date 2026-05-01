import { useSearchParams } from "react-router";
import FilterBar from "../components/Discover/FilterBar";
import { useDiscover } from "../hooks/useDiscover";
import MovieList from "../components/MoviesList/MovieList";
import ListControls from "../components/MoviesList/ListControls";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import ShowSelect from "../components/Discover/ShowSelect";

function DiscoverMoviePage() {
  const [filterParams, setFilterParams] = useSearchParams();

  const showType = filterParams.get("showType") || "movie";
  const withGenres = filterParams.get("with_genres") || "";
  const sortBy = filterParams.get("sort_by") || "popularity.desc";
  const page = Number(filterParams.get("page")) || 1;

  const { movies, genresList, totalPages, status, errorMessage } = useDiscover(
    showType,
    sortBy,
    withGenres,
    page,
  );

  const handleShowTypeToggle = () => {
    setFilterParams((prev) => {
      prev.set("showType", showType === "movie" ? "tv" : "movie");
      prev.set("page", 1);
      return prev;
    });
  };

  const handleSortByChange = (newSort) => {
    setFilterParams((prev) => {
      prev.set("sort_by", newSort);
      prev.set("page", 1);
      return prev;
    });
  };

  const handleGenresChange = (selectedGenres) => {
    setFilterParams((prev) => {
      selectedGenres.length > 0
        ? prev.set("with_genres", selectedGenres.join(","))
        : prev.delete("with_genres");
      prev.set("page", 1);
      return prev;
    });
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
      <div className="flex gap-4 items-center">
        <ShowSelect showType={showType} toggleShowType={handleShowTypeToggle} />
        <FilterBar
          showType={showType}
          selectedGenres={withGenres}
          setSelectedGenres={handleGenresChange}
          genresList={genresList}
          onSortChange={handleSortByChange}
          currentSort={sortBy}
        />
      </div>

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
