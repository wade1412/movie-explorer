// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import MovieCard from "../MovieCard/MovieCard";
import SkeletonGrid from "./SkeletonGrid";
import ListControls from "./ListControls";
import {
  cardVariants,
  fadeVariants,
  gridClass,
  gridVariants,
  headingClass,
} from "./movieListStyles";

function MovieList({
  movies,
  page,
  totalPages,
  changePageNumber,
  status,
  errorMessage,
}) {
  return (
    <AnimatePresence mode="wait">
      {status === "error" && (
        <motion.div
          key="error"
          className="w-full"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2 className={`${headingClass} text-blush`}>
            {errorMessage || "Something went wrong"}
          </h2>
        </motion.div>
      )}

      {status === "loading" && (
        <motion.div
          key="loading"
          className={`${gridClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SkeletonGrid />
        </motion.div>
      )}

      {status === "empty" && (
        <motion.div
          key="empty"
          className="w-full"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2 className={`${headingClass} text-light-blush`}>
            No movies found
          </h2>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          key={`page-${page}`}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ul className={`movie-list-grid ${gridClass} `}>
            {movies.map((movie) => (
              <motion.li key={movie.id} variants={cardVariants}>
                <MovieCard
                  style="movie-search-card"
                  id={movie.id}
                  title={movie.title || movie.name}
                  rating={movie.vote_average}
                  posterPath={movie.poster_path}
                />
              </motion.li>
            ))}
          </ul>

          {movies.length > 0 && (
            <ListControls
              page={page}
              totalPages={totalPages}
              changePageNumber={changePageNumber}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MovieList;
