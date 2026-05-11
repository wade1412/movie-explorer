import { useState } from "react";
import { useShowReviews } from "../../../hooks/useShowReviews";
import UserReview from "./UserReview";

function ShowDetailsReviews({ showType, id }) {
  const [page, setPage] = useState(1);
  const { reviews, status, totalPages, errorMessage } = useShowReviews(
    showType,
    id,
    page,
  );

  return (
    <>
      {status === "success" && (
        <div>
          {reviews.map((r) => (
            <UserReview key={r.id} reviewData={r} />
          ))}
        </div>
      )}
    </>
  );
}

export default ShowDetailsReviews;
