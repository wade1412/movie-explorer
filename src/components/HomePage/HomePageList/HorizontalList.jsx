// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import {
  cardVariants,
  fadeVariants,
  gridVariants,
  headingClass,
} from "../../ShowsList/showListStyles";
import ShowCard from "../../ShowCard/ShowCard";
import SkeletonHorizontalList from "../TrendingMovies/SkeletonHorizotalList";

function HorizontalList({ shows, showType, status, errorMessage }) {
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
          <SkeletonHorizontalList style="custom-scroll overflow-x-scroll" />
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
          key={"shows-success"}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="custom-scroll bg-dark-blue-800 overflow-x-scroll rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-4 sm:py-6 lg:py-8"
        >
          <ul className="flex w-max shrink-0 gap-4">
            {shows.map((show) => (
              <motion.li
                key={show.id}
                variants={cardVariants}
                className="w-35 shrink-0 sm:w-45 md:w-55 lg:w-62.5"
              >
                <ShowCard
                  showType={showType}
                  style="movie-trending-card"
                  id={show.id}
                  title={show.title || show.name}
                  rating={show.vote_average}
                  posterPath={show.poster_path}
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
