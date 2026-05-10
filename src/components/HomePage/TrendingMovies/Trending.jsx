// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useMoviesSlider } from "../../../hooks/useMoviesSlider";
import MovieCarousel from "./MovieCarousel";
import SkeletonHorizontalList from "./SkeletonHorizotalList";
import ValueToggle from "../../ValueToggle";
import { headingStyle, sectionStyle } from "../styles";

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
      <div className={sectionStyle}>
        <h2 className={headingStyle}>Trending 🔥</h2>

        <div className=" px-4 mb-2 flex flex-col items-center gap-2 py-2 md:flex-row">
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
              <SkeletonHorizontalList style="overflow-hidden" />
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
                className={`bg-dark-blue-200 text-blush mx-auto mt-10 max-w-1/2 rounded-xl p-5 text-center text-3xl font-bold`}
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
