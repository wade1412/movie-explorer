import { useState } from "react";
import SearchInput from "../components/moviesSearch/SearchInput";
import MovieList from "../components/moviesSearch/MovieList";
import { useMovies } from "../hooks/useMovies";
import { motion } from "motion/react";
import { searchMovies } from "../services/api";
import Trending from "../components/Trending";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, status, errorMessage } = useMovies(searchQuery, searchMovies);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.section
      className="home-page-section flex flex-col gap-6 py-8 px-4 max-w-[70vw] mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Trending />
      <SearchInput searchQuery={searchQuery} onChange={handleQueryChange} />
      <MovieList movies={movies} status={status} errorMessage={errorMessage} />
    </motion.section>
  );
}

export default HomePage;
