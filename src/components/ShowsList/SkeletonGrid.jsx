import SkeletonCard from "../Skeletons/SkeletonCard";

const skeletonGrid = Array.from({ length: 12 });

function SkeletonGrid() {
  return (
    <>
      {skeletonGrid.map((_, index) => (
        <SkeletonCard key={index} isRating={true} />
      ))}
    </>
  );
}

export default SkeletonGrid;
