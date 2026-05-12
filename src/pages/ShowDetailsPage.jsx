import { useParams } from "react-router";
import { useShowDetails } from "../hooks/useShowDetails";
import { headingClass } from "../components/ShowsList/showListStyles";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import ShowDetailsSkeleton from "../components/ShowDetails/ShowDetailsSkeleton";
import ShowDetailsCard from "../components/ShowDetails/ShowDetailsCard";
import { motionProps } from "../components/ShowDetails/utils";

function ShowDetailsPage() {
  const { showType, id } = useParams();

  const { show, status, errorMessage } = useShowDetails(showType, id);

  return (
    <AnimatePresence mode="wait">
      {status === "error" && (
        <motion.div key="error" className="w-full" {...motionProps}>
          <h2 className={`${headingClass} text-blush`}>
            {errorMessage || "Something went wrong"}
          </h2>
        </motion.div>
      )}

      {status === "loading" && (
        <motion.div key="loading" {...motionProps}>
          <ShowDetailsSkeleton />
        </motion.div>
      )}

      {status === "not-found" && (
        <motion.div key="empty" className="w-full" {...motionProps}>
          <h2 className={`${headingClass} text-light-blush`}>
            No movies found
          </h2>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div key="success" className="w-full" {...motionProps}>
          <ShowDetailsCard show={show} showType={showType} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShowDetailsPage;
