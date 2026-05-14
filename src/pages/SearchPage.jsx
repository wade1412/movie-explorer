// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import ShowSearch from "../components/ShowSearch/ShowSearch";
import { useState } from "react";

function SearchPage() {
  const [showType, setShowType] = useState("movie");

  const toggleShowType = () =>
    setShowType(showType === "movie" ? "tv" : "movie");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4 py-2 items-center mx-auto"
    >
      <ShowSearch showType={showType} toggleShowType={toggleShowType} />
    </motion.div>
  );
}

export default SearchPage;
