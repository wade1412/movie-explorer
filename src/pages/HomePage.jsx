// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Trending from "../components/TrendingMovies/Trending";
import MoviesSearch from "../components/MoviesSearch/MoviesSearch";

function HomePage() {
  return (
    <motion.section
      className=" flex flex-col gap-6 py-2 mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Trending />
      <MoviesSearch />
    </motion.section>
  );
}

export default HomePage;
