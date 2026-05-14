// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Trending from "../components/HomePage/TrendingMovies/Trending";
import HomePageList from "../components/HomePage/HomePageList/HomePageList";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <motion.section
      className="flex flex-col gap-4 py-2 mx-auto"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Trending />
      <HomePageList showType="movie" />
      <HomePageList showType="tv" />
    </motion.section>
  );
}

export default HomePage;
