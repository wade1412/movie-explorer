import { Skeleton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ShowDetailsGenres from "./ShowDetailsGenres";
import { mapShowDetails } from "./utils";
import ShowDetailsReviews from "./Reviews/ShowDetailsReviews";
import ShowDetailsRecommendations from "./Recommendations/ShowDetailsRecommendations";
import ShowDetailsMetaInfo from "./ShowDetailsMetaInfo";

const detailsStyle = (gapClass = "gap-4") =>
  `bg-dark-blue-900 flex w-full flex-col ${gapClass} rounded-xl px-6 py-4 shadow-lg`;

function ShowDetailsCard({ show, showType }) {
  // Local state for Image loading
  const [isImageLoading, setIsImageLoading] = useState(true);

  const data = useMemo(() => mapShowDetails(show), [show]);

  // Scroll to top of the page on the show change
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [show]);

  return (
    <section className="mx-auto p-6">
      <div className="flex flex-col justify-center gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* -----Poster Div----- */}
        <div className="bg-dark-blue-600 flex aspect-2/3 w-full items-center overflow-hidden rounded-2xl shadow-2xl">
          {data.posterPath ? (
            <>
              {isImageLoading && <Skeleton animation="wave" />}

              <img
                // Change local state for Image on its load
                onLoad={() => {
                  // Avoid flicker on cached images, by using one frame
                  requestAnimationFrame(() => setIsImageLoading(false));
                }}
                alt={data.title}
                src={`https://image.tmdb.org/t/p/w780${show.poster_path}`}
                loading="lazy"
                className={`movie-details-poster h-full w-full object-cover transition-all duration-300 ${isImageLoading ? " opacity-0" : "opacity-100"}`}
              />
            </>
          ) : (
            <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
              {" "}
              Poster not found
            </h2>
          )}
        </div>

        {/* -----Show Data Div----- */}
        <div className="flex flex-col gap-4">
          {/* First row: Title */}
          <div className={detailsStyle("gap-1")}>
            <h3 className="text-blue mx-auto text-center text-3xl font-bold">
              {data.title}
            </h3>
            <p className="mx-auto font-semibold text-cyan-800">
              {data.originalTitle}
            </p>
            <p className="text-light-blush mx-auto italic">{data.tagline}</p>
          </div>

          {/* Second row: Overview and Genres */}
          <div className={detailsStyle()}>
            <p>{data.overview}</p>
            <ShowDetailsGenres genres={data.genres} showType={showType} />
          </div>

          <ShowDetailsMetaInfo showType={showType} data={data} />
        </div>

        {/* Fifth Row: Reviews */}
        <div className="bg-dark-blue-900 flex flex-col gap-4 rounded-xl py-4 lg:col-span-2">
          <h2 className="px-4 text-lg md:text-xl">Reviews 🌟 </h2>
          <ShowDetailsReviews showType={showType} id={data.id} />
        </div>

        {/* Last Row: Recommendations */}
        <div className="bg-dark-blue-900 flex flex-col gap-4 rounded-xl p-4 px-3 lg:col-span-2">
          <h2 className="px-3 text-lg md:text-xl font-semibold">
            More Like This {showType === "movie" ? "🎬" : "📺"}{" "}
          </h2>
          <ShowDetailsRecommendations showType={showType} id={data.id} />
        </div>
      </div>
    </section>
  );
}

export default ShowDetailsCard;
