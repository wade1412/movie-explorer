import { Skeleton } from "@mui/material";
import { useMemo, useState } from "react";
import ShowDetailsGenres from "./ShowDetailsGenres";
import { mapShowDetails } from "./utils";

const detailsStyle = (gapClass = "gap-4") =>
  `bg-dark-blue-900 flex w-full flex-col ${gapClass} rounded-xl px-6 py-4 shadow-lg`;

function ShowDetailsCard({ show, showType }) {
  // Local state for Image loading
  const [isImageLoading, setIsImageLoading] = useState(true);

  const data = useMemo(() => mapShowDetails(show), [show]);

  return (
    <section className="mx-auto p-6">
      <div className="flex flex-col justify-center gap-4 lg:grid lg:grid-cols-2">
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
                className={`h-full w-full object-cover transition-opacity duration-300 ${isImageLoading ? " opacity-0" : "opacity-100"}`}
              />
            </>
          ) : (
            <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
              {" "}
              Poster not found
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className={detailsStyle("gap-1")}>
            <h3 className="text-blue mx-auto text-center text-3xl font-bold">
              {data.title}
            </h3>
            <p className="mx-auto font-semibold text-cyan-800">
              {data.originalTitle}
            </p>
            <p className="text-light-blush mx-auto italic">{data.tagline}</p>
          </div>

          <div className={detailsStyle()}>
            <p className="">{data.overview}</p>

            <ShowDetailsGenres genres={data.genres} showType={showType} />
          </div>

          <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
            <div className={`${detailsStyle()} justify-center`}>
              {data.languages && (
                <p>
                  🌐 Language: <i>{data.languages}</i>
                </p>
              )}

              {showType === "movie" && (
                <p>
                  📅 Released: <i>{data.releaseDate ?? "Not available"}</i>
                </p>
              )}

              {showType === "tv" && (
                <div className="flex flex-col gap-1">
                  <p>
                    📅 First air date:{" "}
                    <i>{data.releaseDate ?? "Not available"}</i>
                  </p>
                  <p>
                    📅 Last air date:{" "}
                    <i>{data.lastAirDate ?? "Not available"}</i>
                  </p>
                </div>
              )}

              {showType === "movie" && (
                <p>
                  🎬 Runtime: <i>{data.runtime} minutes</i>
                </p>
              )}

              {showType === "tv" && (
                <div className="flex flex-col gap-1">
                  <span>
                    📺 Seasons:{" "}
                    <i>{show.number_of_seasons ?? "Not available"}</i>
                  </span>
                  <span>
                    📺 Episodes:{" "}
                    <i>{show.number_of_episodes ?? "Not available"}</i>
                  </span>
                </div>
              )}

              <p>
                ⭐ Rating:
                <i>
                  {data.voteAverage
                    ? `  ${data.voteAverage.toFixed(1)} / 10`
                    : "Movie not rated"}
                </i>
              </p>

              {data.budget && (
                <p>
                  💰 Budget: <i>{data.budget}</i>
                </p>
              )}

              {data.revenue && (
                <p>
                  📈 Revenue: <i>{data.revenue}</i>
                </p>
              )}
            </div>

            <div
              className={`${detailsStyle()} justify-center md:flex-row md:justify-around md:bg-dark-blue-950 md:p-0`}
            >
              <div className="flex flex-col gap-1 md:bg-dark-blue-900 md:p-4 md:rounded-xl">
                <p className="font-semibold">Production companies: </p>
                {data.productionCompanies.map((c) => (
                  <span key={c.id} className="font-light">
                    {c.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1 md:bg-dark-blue-900 md:p-4 md:rounded-xl">
                <p className="font-semibold">Production countries: </p>
                {data.productionCountries.map((c) => (
                  <span key={c.iso_3166_1} className="font-light">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowDetailsCard;
