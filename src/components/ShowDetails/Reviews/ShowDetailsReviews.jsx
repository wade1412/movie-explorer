import { useState } from "react";
import { useShowReviews } from "../../../hooks/useShowReviews";
import UserReview from "./UserReview";

function ShowDetailsReviews({ showType, id }) {
  const [page, setPage] = useState(1);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { reviews, status, totalPages, errorMessage } = useShowReviews(
    showType,
    id,
    page,
  );

  const handleReviewClick = (newId) => {
    setSelectedReviewId(selectedReviewId === newId ? null : newId);
  };

  return (
    <div className="h-fit max-h-125 overflow-y-auto pr-2">
      {status === "success" && reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {reviews.map((r) => (
            <UserReview
              key={r.id}
              reviewData={r}
              isSelected={selectedReviewId === r.id}
              handleReviewClick={handleReviewClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-dark-blue-600 flex rounded-xl px-4 py-2 text-lg font-light text-white italic">
          No reviews yet
        </div>
      )}
    </div>
  );
}

export default ShowDetailsReviews;
