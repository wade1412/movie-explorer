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
          className="custom-scroll bg-dark-blue-800 overflow-x-scroll rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-4 sm:py-6 lg:py-8"
        >
          <ul className="flex w-max shrink-0 gap-4">
            {movies.map((movie) => (
              <motion.li
                key={movie.id}
                variants={cardVariants}
                className="w-35 shrink-0 sm:w-45 md:w-55 lg:w-62.5"
              >
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
