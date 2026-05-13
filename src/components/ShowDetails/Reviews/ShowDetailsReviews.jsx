import { useState } from "react";
import { useShowReviews } from "../../../hooks/useShowReviews";
import UserReview from "./UserReview";
import { motionProps } from "../utils";
import { headingClass } from "../../ShowsList/showListStyles";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import SkeletonReviewList from "./SkeletonReviewList";
import ReviewListControls from "./ReviewListControls";

function ShowDetailsReviews({ showType, id }) {
  const [page, setPage] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { reviews, status, totalPages, errorMessage } = useShowReviews(
    showType,
    id,
    page,
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedReviewId(null);
  };

  const handleReviewClick = (newId) => {
    setSelectedReviewId(selectedReviewId === newId ? null : newId);
  };

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
          <SkeletonReviewList />
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
        <motion.div key="success" {...motionProps}>
          {reviews.length > 0 ? (
            <div className="h-fit max-h-125 overflow-y-auto custom-vertical-scroll px-2">
              <div className="flex flex-wrap gap-4">
                {reviews.map((r) => (
                  <UserReview
                    key={r.id}
                    reviewData={r}
                    isSelected={selectedReviewId === r.id}
                    handleReviewClick={handleReviewClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-dark-blue-600 flex rounded-xl px-4 py-2 text-lg font-light text-white italic">
              No reviews yet
            </div>
          )}

          {totalPages > 1 && (
            <ReviewListControls
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShowDetailsReviews;
