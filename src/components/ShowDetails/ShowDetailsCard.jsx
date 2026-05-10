import { Skeleton } from "@mui/material";
import { useState } from "react";
import ShowDetailsGenres from "./ShowDetailsGenres";

const detailsStyle = (gapClass = "gap-4") =>
  `bg-dark-blue-900 flex w-full flex-col ${gapClass} rounded-xl px-6 py-4 shadow-lg`;

const formatDate = (date) => {
  if (!date) {
    return "Release date unknown";
  }

  const newDate = new Date(date);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

function ShowDetailsCard({ show, showType }) {
  // Local state for Image loading
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Unified fields
  const title = show.title || show.name;
  const originalTitle = show.original_title || show.original_name;
  const releaseDate = show.release_date || show.first_air_date;
  const runtime = show.runtime || show.episode_run_time?.[0] || null;

  // Unified arrays
  const languages = show.spoken_languages || [];
  const genres = show.genres || [];
  const productionCompanies = show.production_companies || [];
  const productionCountries = show.production_countries || [];

  // TV shows don't have budget/revenue
  const budget = show.budget || null;
  const revenue = show.revenue || null;

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="grid justify-center gap-6 md:grid-cols-2 ">
        <div className="bg-dark-blue-600 flex items-center overflow-hidden rounded-2xl shadow-2xl ">
          {show.poster_path ? (
            <>
              {isImageLoading && <Skeleton animation="wave" />}

              <img
                // Change local state for Image on its load
                onLoad={() => {
                  // Avoid flicker on cached images, by using one frame
                  requestAnimationFrame(() => setIsImageLoading(false));
                }}
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                loading="lazy"
                className="movie-details-poster block h-full w-full object-cover"
              />
            </>
          ) : (
            <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
              {" "}
              Poster not found
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-4 ">
          <div className={detailsStyle(1)}>
            <h3 className="text-blue mx-auto text-center text-3xl font-bold">
              {title}
            </h3>
            <p className="mx-auto font-semibold text-cyan-800">
              {originalTitle}
            </p>
            <p className="text-light-blush mx-auto italic">{show.tagline}</p>
          </div>

          <div className={detailsStyle()}>
            <p className="">{show.overview}</p>

            <ShowDetailsGenres genres={genres} />
          </div>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            <div className={`${detailsStyle()}  justify-center`}>
              {languages && (
                <p>
                  🌐 Language: <i>{languages.map((l) => l.name).join(", ")}</i>
                </p>
              )}

              <p>
                📅 Released: <i>{formatDate(releaseDate)}</i>
              </p>

              {showType === "movie" && (
                <p>
                  🎬 Runtime: <i>{runtime} minutes</i>
                </p>
              )}

              {showType === "tv" && (
                <p>
                  📺 Episode runtime: <i>{runtime} minutes</i>
                </p>
              )}

              {budget && budget !== 0 && (
                <p>
                  💰 Budget: <i>{`$${budget.toLocaleString()}`}</i>
                </p>
              )}

              {revenue && revenue !== 0 && (
                <p>
                  📈 Revenue: <i>{`$${revenue.toLocaleString()}`}</i>
                </p>
              )}
            </div>

            <div className={`${detailsStyle()}  justify-center`}>
              <div className="flex flex-col gap-1">
                <p>Production companies: </p>
                {productionCompanies.map((c) => (
                  <span key={c.id} className="font-light ">
                    {c.name}
                  </span>
                ))}
              </div>
              <div>
                <p>Production countries: </p>
                {productionCountries.map((c) => (
                  <span key={c.iso_3166_1} className="font-light ">
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
