import SkeletonCard from "../Skeletons/SkeletonCard";

function SkeletonGrid() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <SkeletonCard key={index} isRating={true} />
      ))}
    </>
  );
}

export default SkeletonGrid;
