import { Avatar, Skeleton } from "@mui/material";

function SkeletonReview() {
  return (
    <div className="bg-dark-blue-800 flex w-full flex-col gap-2 rounded-2xl p-2 xl:w-[calc(50%---spacing(2))] max-h-50">
      {/* Main Row Skeleton */}
      <div className="bg-dark-blue-600 flex w-full flex-row items-center rounded-2xl px-2 py-1">
        {/* Avatar Skeleton */}
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>

        {/* Username and Rating Skeleton */}
        <div className="flex w-full flex-col items-center justify-center gap-1">
          {/* Author Name */}
          <Skeleton
            variant="text"
            width="40%"
            height={24}
            sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
          />

          {/* Rating Stars */}
          <Skeleton
            variant="rectangular"
            width="60%"
            height={20}
            sx={{ bgcolor: "rgba(255,255,255,0.1)", borderRadius: "4px" }}
          />
        </div>
      </div>

      {/* Content Skeleton (2 lines) */}
      <div className="px-2 py-1">
        <Skeleton
          variant="text"
          width="100%"
          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
        />
        <Skeleton
          variant="text"
          width="85%"
          sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
        />
      </div>
    </div>
  );
}

export default SkeletonReview;
