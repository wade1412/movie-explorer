import { AnimatePresence, motion } from "motion/react";
import MovieCard from "./MovieCard";
import SkeletonGrid from "./SkeletonGrid";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -10 },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const gridClass =
  "grid grid-cols-1 gap-6 transition-opacity duration-300 sm:grid-cols-2 md:grid-cols-3 ";

const headingClass =
  "text-3xl font-bold mx-auto text-center p-5 mt-10 rounded-xl bg-dark-blue-200 max-w-1/2";

function MovieList({ movies, status, errorMessage }) {
  return (
    <AnimatePresence>
      {status === "idle" && null}
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
      {status === "success" && (
        <motion.ul
          className={`movie-list-grid ${gridClass} `}
          key="success"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {movies.map((movie) => (
            <motion.li key={movie.id} variants={cardVariants}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

export default MovieList;
