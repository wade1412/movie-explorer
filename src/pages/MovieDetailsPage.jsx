import { useParams } from "react-router";
import { useMovieDetails } from "../hooks/useMovieDetails";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const { movie, status, errorMessage } = useMovieDetails(movieId);

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
      <>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
        <h3>{movie.title}</h3>
        <p>{movie.original_title}</p>
        <p>{movie.release_date}</p>
        <p>{movie.tagline}</p>
        <ul>
          Genres:
          {movie.genres?.map((genre) => (
            <li key={genre.id} id={genre.id}>
              {genre.name}
            </li>
          ))}
        </ul>
        <p>{movie.overview}</p>

        <p>Runtime: {movie.runtime} minutes</p>
        <p>Budget: {movie.budget}</p>
        <p>Revenue: {movie.revenue}</p>
      </>
    );
  }

  return null;
}

export default MovieDetailsPage;
