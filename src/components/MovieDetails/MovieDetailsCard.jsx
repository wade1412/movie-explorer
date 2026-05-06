import { Skeleton } from "@mui/material";
import { useState } from "react";
import MovieDetailsGenres from "./MovieDetailsGenres";

const detailsStyle = (gap = 4) =>
  `bg-dark-blue-900 flex w-full flex-col gap-${gap} rounded-xl px-6 py-4 shadow-lg`;

function MovieDetailsCard({ movie }) {
  // Local state for Image loading
  const [isImageLoading, setIsImageLoading] = useState(true);

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

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="grid justify-center gap-6 md:grid-cols-2 ">
        <div className="bg-dark-blue-600 flex items-center overflow-hidden rounded-2xl shadow-2xl ">
          {movie.poster_path ? (
            <>
              {isImageLoading && <Skeleton animation="wave" />}

              <img
                // Change local state for Image on its load
                onLoad={() => {
                  // Avoid flicker on cached images, by using one frame
                  requestAnimationFrame(() => setIsImageLoading(false));
                }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                loading="lazy"
                className="movie-details-poster block h-full w-full object-cover"
              />
            </>
          ) : (
            <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
              {" "}
              Movie Poster not found
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-4 ">
          <div className={detailsStyle(1)}>
            <h3 className="text-blue mx-auto text-center text-3xl font-bold">
              {movie.title}
            </h3>
            <p className="mx-auto font-semibold text-cyan-800">
              {movie.original_title}
            </p>
            <p className="text-light-blush mx-auto italic">{movie.tagline}</p>
          </div>

          <div className={detailsStyle()}>
            <p className="">{movie.overview}</p>

            <MovieDetailsGenres genres={movie.genres} />
          </div>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            <div className={`${detailsStyle()}  justify-center`}>
              {movie.spoken_languages && (
                <p>
                  🌐 Language:{" "}
                  <i>{movie.spoken_languages.map((l) => l.name).join(", ")}</i>
                </p>
              )}

              <p>
                📅 Released: <i>{formatDate(movie.release_date)}</i>
              </p>

              <p>
                🎬 Runtime: <i>{movie.runtime} minutes</i>
              </p>

              {movie.budget !== 0 && (
                <p>
                  💰 Budget: <i>{`$${movie.budget.toLocaleString()}`}</i>
                </p>
              )}

              {movie.revenue !== 0 && (
                <p>
                  📈 Revenue: <i>{`$${movie.revenue.toLocaleString()}`}</i>
                </p>
              )}
            </div>

            <div className={`${detailsStyle()}  justify-center`}>
              <div className="flex flex-col gap-1">
                <p>Production companies: </p>
                {movie.production_companies.map((c) => (
                  <span key={c.id} className="font-light ">
                    {c.name}
                  </span>
                ))}
              </div>
              <div>
                <p>Production countries: </p>
                {movie.production_countries.map((c) => (
                  <span key={c.id} className="font-light ">
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

export default MovieDetailsCard;
