function SkeletonCard() {
  return (
    <div className="bg-dark-blue-400 grid h-full animate-pulse overflow-hidden rounded-lg text-center shadow-lg">
      <div className="relative aspect-4/5 overflow-hidden p-5">
        <div className="bg-dark-blue-200 h-full rounded-lg"></div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-2 pb-4">
        <p className="bg-dark-blue-200 mb-2 h-8 w-3/4 rounded"></p>
        <p className="bg-dark-blue-200 h-8 w-1/2 rounded-xl p-2 px-4"></p>
      </div>
    </div>
  );
}

export default SkeletonCard;
