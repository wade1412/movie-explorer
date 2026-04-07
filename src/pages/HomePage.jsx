import { useState } from "react";
import SearchInput from "../components/SearchInput";
import MovieList from "../components/MovieList";
import { useMovies } from "../hooks/useMovies";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, status, errorMessage } = useMovies(searchQuery);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <h1>Home Page</h1>
      <SearchInput searchQuery={searchQuery} onChange={handleQueryChange} />
      <MovieList movies={movies} status={status} errorMessage={errorMessage} />
    </>
  );
}

export default HomePage;
