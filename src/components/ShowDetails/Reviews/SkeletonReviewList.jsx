import SkeletonReview from "./SkeletonReview";

const skeletonArray = Array.from({ length: 4 });

function SkeletonReviewList() {
  return (
    <>
      {skeletonArray.map((_, index) => (
        <SkeletonReview key={`skeleton-review-${index}`} />
      ))}
    </>
  );
}

export default SkeletonReviewList;
