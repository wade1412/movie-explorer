// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import {
  cardVariants,
  fadeVariants,
  gridClass,
  gridVariants,
  headingClass,
} from "../MoviesList/movieListStyles";
import MovieCard from "../MovieCard/MovieCard";
import SkeletonGrid from "../MoviesList/SkeletonGrid";

function HorizontalList({ movies, status, errorMessage }) {
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
          key={"movies-success"}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ul className="">
            {movies.map((movie) => (
              <motion.li key={movie.id} variants={cardVariants}>
                <MovieCard
                  style="movie-trending-card"
                  id={movie.id}
                  title={movie.title || movie.name}
                  rating={movie.vote_average}
                  posterPath={movie.poster_path}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HorizontalList;
