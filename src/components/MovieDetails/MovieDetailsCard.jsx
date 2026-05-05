import { Skeleton } from "@mui/material";
import { useState } from "react";
import MovieDetailsGenres from "./MovieDetailsGenres";

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
    <section className="mx-auto max-w-5xl p-6">
      <div className="grid justify-center gap-6 md:grid-cols-2">
        <div className="bg-dark-blue-200 flex items-center overflow-hidden rounded-2xl shadow-2xl">
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

        <div className="flex flex-col gap-6">
          <div className="bg-dark-blue-700 border-dark-blue-200 flex flex-col gap-1 rounded-2xl border px-2 py-3 shadow-lg">
            <h3 className="text-blue mx-auto text-center text-3xl font-bold">
              {movie.title}
            </h3>
            <p className="mx-auto font-semibold text-cyan-800">
              {movie.original_title}
            </p>
            <p className="text-light-blush mx-auto italic">{movie.tagline}</p>
          </div>

          <div className="movie-info bg-dark-blue-700 border-dark-blue-200 mx-auto flex w-full flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg">
            <p className="">{movie.overview}</p>

            <MovieDetailsGenres genres={movie.genres} />
          </div>

          <div className="movie-meta bg-dark-blue-700 border-dark-blue-200 mx-auto flex w-full flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg">
            <p>Released: {formatDate(movie.release_date)}</p>

            <p>Runtime: {movie.runtime} minutes</p>

            {movie.budget !== 0 && (
              <p>Budget: {`${movie.budget.toLocaleString()}`}</p>
            )}

            {movie.revenue !== 0 && (
              <p>Revenue: {`${movie.revenue.toLocaleString()}`}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailsCard;
