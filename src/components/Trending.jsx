import { useTrending } from "../hooks/useTrending";
import MovieCarousel from "./MovieCarousel";
import SkeletonTrending from "./SkeletonTrending";
import { AnimatePresence, motion } from "motion/react";

function Trending() {
  const { movies, status, errorMessage } = useTrending();

  return (
    <>
      <div className="w-full p-2">
        <h2 className="text-2xl font-semibold mb-2">Trending movies 🔥</h2>
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="trending-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonTrending />
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="trending-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2
                className={`text-3xl font-bold mx-auto text-center p-5 mt-10 rounded-xl bg-dark-blue-200 max-w-1/2 text-blush`}
              >
                {errorMessage || "Something went wrong"}
              </h2>
            </motion.div>
          )}

          {status === "success" && movies?.length > 0 && (
            <motion.div
              key="trending-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MovieCarousel movies={movies} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Trending;
