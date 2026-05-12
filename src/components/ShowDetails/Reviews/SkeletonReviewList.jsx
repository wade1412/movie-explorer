import SkeletonReview from "./SkeletonReview";

function SkeletonReviewList() {
  return (
    <>
      {Array.from(
        { length: 4 }.map((_, index) => (
          <SkeletonReview key={`skeleton-review-${index}`} />
        )),
      )}
    </>
  );
}

export default SkeletonReviewList;
