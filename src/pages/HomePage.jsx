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
    <section className="home-page-section flex flex-col gap-6 py-4 px-4 max-w-6xl mx-auto">
      <SearchInput searchQuery={searchQuery} onChange={handleQueryChange} />
      <MovieList movies={movies} status={status} errorMessage={errorMessage} />
    </section>
  );
}

export default HomePage;
