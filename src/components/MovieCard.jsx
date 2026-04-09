import { Link } from "react-router";

function MovieCard({ title, rating, id, posterPath }) {
  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="movie-card bg-dark-blue-400 flex flex-col h-full justify-center items-center overflow-hidden rounded-lg py-2 text-center shadow-lg">
        <div className="poster-container flex aspect-4/5 items-center justify-center overflow-hidden rounded-lg p-3">
          {posterPath === null ? (
            <div className="bg-dark-blue-200 flex h-full w-full items-center justify-center rounded-lg">
              <h2 className="text-mute mx-auto w-4/5 text-center text-lg font-light">
                {" "}
                No Image
              </h2>
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w300${posterPath}`}
              loading="lazy"
              className="movie-poster block h-full w-full rounded-lg object-cover shadow-lg"
            ></img>
          )}
        </div>

        <div className="px-6 py-4 flex flex-col items-center justify-center w-full">
          <p className="movie-title mb-2 text-lg font-semibold line-clamp-2">
            {title}
          </p>
          <p className="text-sm font-semibold rounded-xl p-2 bg-dark-blue-600 w-1/2">
            {rating === 0 ? "Movie not rated" : ` ⭐ ${rating}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
