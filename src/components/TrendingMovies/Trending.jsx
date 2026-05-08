import { useMoviesSlider } from "../../hooks/useMoviesSlider";
import MovieCarousel from "./MovieCarousel";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import SkeletonTrending from "./SkeletonTrending";
import ValueToggle from "../ValueToggle";
import { useState } from "react";

function Trending() {
  const [showType, setShowType] = useState("movie");
  const [timePeriod, setTimePeriod] = useState("day");

  const { movies, status, errorMessage } = useMoviesSlider(
    showType,
    timePeriod,
  );

  const handleShowToggle = () => {
    setShowType(showType === "movie" ? "tv" : "movie");
  };

  const handleTimePeriodToggle = () => {
    setTimePeriod(timePeriod === "day" ? "week" : "day");
  };

  return (
    <>
      <div
        className="w-full px-4 py-6 bg-dark-blue-900 rounded-xl max-w-7xl mx-auto
      "
      >
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
          Trending movies 🔥
        </h2>

        <div className="flex gap-2 py-4">
          <ValueToggle
            value={showType}
            toggleValue={handleShowToggle}
            valueOne="Movie"
            valueTwo="TV"
          />
          <ValueToggle
            value={timePeriod}
            toggleValue={handleTimePeriodToggle}
            valueOne="Day"
            valueTwo="Week"
          />
        </div>

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
