import MovieCard from "./MovieCard";

function MovieList({ movies, status, errorMessage }) {
  if (status === "idle") {
    return (
      <div>
        <h2>Search for a movie</h2>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div>
        <h2>Loading movies...</h2>
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

  if (status === "empty") {
    return (
      <div>
        <h2>No movies found</h2>
      </div>
    );
  }

  if (status === "success")
    return (
      <div className="movie-list-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    );
}

export default MovieList;
