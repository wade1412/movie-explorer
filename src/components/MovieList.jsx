import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import SkeletonGrid from "./SkeletonGrid";

function MovieList({ movies, status, errorMessage }) {
  const gridClass =
    "grid grid-cols-1 gap-6 transition-opacity duration-300 sm:grid-cols-2 md:grid-cols-3 ";

  if (status === "error") {
    return (
      <div className="w-full">
        <h2 className="text-3xl font-bold mx-auto text-center p-5 mt-10 rounded-xl bg-dark-blue-200 max-w-1/2 text-blush">
          {errorMessage || "Something went wrong"}
        </h2>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="w-full">
        <h2 className="text-3xl font-bold mx-auto text-center p-5 mt-10 rounded-xl bg-dark-blue-200 max-w-1/2 text-light-blush">
          No movies found
        </h2>
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-350">
      {status === "loading" && (
        <div className={`${gridClass}`}>
          <SkeletonGrid />
        </div>
      )}
      {status === "success" && movies.length > 0 && (
        <div className={`movie-list-grid ${gridClass} `}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
