import { useMoviesSearch } from "../../hooks/useMoviesSearch";
import SearchInput from "./SearchInput";
import MovieList from "./MovieList";
import { useSearchParams } from "react-router";

function MoviesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const { movies, totalPages, status, errorMessage } = useMoviesSearch(
    query,
    page,
  );

  const handleQueryChange = (e) => {
    setSearchParams((prev) => {
      prev.set("query", e.target.value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };

  return (
    <>
      <SearchInput searchQuery={query} onChange={handleQueryChange} />
      <MovieList
        movies={movies}
        page={page}
        totalPages={totalPages}
        changePageNumber={handlePageChange}
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default MoviesSearch;
