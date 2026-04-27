function SkeletonCard({ isRating }) {
  return (
    <div className="h-full w-full">
      <div className="bg-dark-blue-400 flex flex-col h-full animate-pulse overflow-hidden rounded-lg text-center shadow-lg ">
        <div className="relative aspect-2/3 overflow-hidden p-2 lg:p-4">
          <div className="bg-dark-blue-200 h-full w-full rounded-lg"></div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 p-4 pb-6">
          <div className="bg-dark-blue-200 h-7 w-5/6 rounded"></div>

          {isRating && (
            <div className="bg-dark-blue-200 h-8 w-1/2 rounded-xl mt-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
