import { useParams } from "react-router";
import { useMovieDetails } from "../hooks/useMovieDetails";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const { movie, status, errorMessage } = useMovieDetails(movieId);

  const formatDate = (date) => {
    if (date) {
      const newDate = new Date(date);
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(newDate);
    }
    return "Release date unknown";
  };

  if (status === "loading") {
    return (
      <div>
        <h2>Loading movie...</h2>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <h2>{errorMessage || "Something went wrong"}</h2>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div>
        <h2>Movie not found</h2>
      </div>
    );
  }

  if (status === "success") {
    return (
      <section className="movie-details-section max-w-5xl p-6">
        <div className="grid-movie-wrapper grid justify-center gap-6 md:grid-cols-2">
          <div className="img-wrapper bg-dark-blue-200 flex items-center overflow-hidden rounded-2xl shadow-2xl">
            {movie.poster_path === null ? (
              <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
                {" "}
                Movie Poster not found
              </h2>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                loading="lazy"
                className="movie-details-poster block object-cover h-full w-full"
              ></img>
            )}
          </div>

          <div className="flex flex-col gap-6 ">
            <div className="bg-dark-blue-700 border-dark-blue-200 flex flex-col gap-1 rounded-2xl border px-2 py-3 shadow-lg">
              <h3 className="text-blue mx-auto text-center text-3xl font-bold">
                {movie.title}
              </h3>
              <p className="mx-auto font-semibold text-cyan-800">
                {movie.original_title}
              </p>
              <p className="text-light-blush mx-auto italic">{movie.tagline}</p>
            </div>

            <div className="movie-info w-full mx-auto bg-dark-blue-700 border-dark-blue-200 flex flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg">
              <p className="">{movie.overview}</p>
              <div className="flex gap-2 items-center">
                Genres:{" "}
                {movie.genres.map((genre) => (
                  <span className="border border-dark-blue-200 bg-dark-blue-800 px-2 rounded-lg text-base">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="movie-meta w-full mx-auto bg-dark-blue-700 border-dark-blue-200 flex flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg">
              <p>Released: {formatDate(movie.release_date)}</p>

              <p>Runtime: {movie.runtime} minutes</p>
              <p>
                Budget:
                {movie.budget === 0
                  ? " Information not available"
                  : ` $ ${movie.budget.toLocaleString()}`}
              </p>
              <p>
                Revenue:
                {movie.revenue === 0
                  ? " Information not available"
                  : ` $ ${movie.revenue.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default MovieDetailsPage;
