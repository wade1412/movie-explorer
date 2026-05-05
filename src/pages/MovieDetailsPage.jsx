import { useParams } from "react-router";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { Skeleton } from "@mui/material";
import {
  fadeVariants,
  headingClass,
} from "../components/MoviesList/movieListStyles";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import MovieDetailsCard from "../components/MovieDetails/MovieDetailsCard";
import MovieDetailsSkeleton from "../components/MovieDetails/MovieDetailsSkeleton";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const { movie, status, errorMessage } = useMovieDetails(movieId);

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MovieDetailsSkeleton />
        </motion.div>
      )}

      {status === "not-found" && (
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
          key="success"
          className="w-full"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <MovieDetailsCard movie={movie} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MovieDetailsPage;
