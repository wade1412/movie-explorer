import SkeletonCard from "./SkeletonCard";

function SkeletonGrid() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
}

export default SkeletonGrid;
