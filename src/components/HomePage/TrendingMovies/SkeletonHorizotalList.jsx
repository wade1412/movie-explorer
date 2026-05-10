import SkeletonCard from "../../Skeletons/SkeletonCard";

function SkeletonHorizontalList({ style }) {
  return (
    <div
      className={`${style} bg-dark-blue-800 py-4 sm:py-6 lg:py-8 rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]`}
    >
      <div className="flex shrink-0 w-max gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            className="w-35 shrink-0 sm:w-45 md:w-55 lg:w-62.5"
            key={`${index}-trending-skeleton-card`}
          >
            <SkeletonCard isRating={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonHorizontalList;
