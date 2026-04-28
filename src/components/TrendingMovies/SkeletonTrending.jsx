import SkeletonCard from "../Skeletons/SkeletonCard";

function SkeletonTrending() {
  return (
    <div className="overflow-hidden bg-dark-blue-800 py-4 sm:py-6 lg:py-8 rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex w-max gap-3 sm:gap-4 lg:gap-6 shrink-0">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            className="shrink-0 w-35 sm:w-50 lg:w-65"
            key={`${index}-trending-skeleton-card`}
          >
            <SkeletonCard isRating={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonTrending;
