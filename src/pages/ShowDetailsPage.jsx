import { useParams } from "react-router";
import { useShowDetails } from "../hooks/useShowDetails";
import { Skeleton } from "@mui/material";
import {
  fadeVariants,
  headingClass,
} from "../components/ShowsList/showListStyles";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import ShowDetailsSkeleton from "../components/ShowDetails/ShowDetailsSkeleton";
import ShowDetailsCard from "../components/ShowDetails/ShowDetailsCard";

function ShowDetailsPage() {
  const { showType, id } = useParams();

  const { show, status, errorMessage } = useShowDetails(showType, id);

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
          <ShowDetailsSkeleton />
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
          <ShowDetailsCard show={show} showType={showType} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShowDetailsPage;
