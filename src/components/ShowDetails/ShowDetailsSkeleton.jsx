import { Skeleton } from "@mui/material";

const detailsStyle = (gapClass = "gap-4") =>
  `bg-dark-blue-900 flex w-full flex-col ${gapClass} rounded-xl px-6 py-4 shadow-lg`;

function ShowDetailsCardSkeleton() {
  return (
    <section className="mx-auto p-6">
      <div className="flex flex-col justify-center gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* -----Poster Skeleton Div----- */}
        <div className="bg-dark-blue-600 flex aspect-2/3 w-full items-center overflow-hidden rounded-2xl shadow-2xl">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
          />
        </div>

        {/* -----Show Data Skeleton Div----- */}
        <div className="flex flex-col gap-4">
          {/* First row: Title Skeleton */}
          <div className={detailsStyle("gap-1Items")}>
            <div className="flex flex-col items-center w-full gap-2 py-2">
              <Skeleton
                animation="wave"
                variant="text"
                width="70%"
                height={40}
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                height={24}
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="50%"
                height={20}
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
          </div>

          {/* Second row: Overview and Genres Skeleton */}
          <div className={detailsStyle()}>
            {/* Overview paragraph lines */}
            <div className="flex flex-col gap-2">
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="90%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="60%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
            {/* Genres badges skeleton */}
            <div className="flex gap-2 mt-2">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={80}
                height={28}
                className="rounded-full"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={70}
                height={28}
                className="rounded-full"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={90}
                height={28}
                className="rounded-full"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
          </div>

          {/* Meta Info Skeleton */}
          <div className={detailsStyle("gap-3")}>
            <div className="flex justify-between items-center w-full">
              <Skeleton
                animation="wave"
                variant="text"
                width="30%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="20%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <Skeleton
                animation="wave"
                variant="text"
                width="25%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.08)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowDetailsCardSkeleton;
