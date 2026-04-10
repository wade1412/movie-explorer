import { useState } from "react";
import { Link } from "react-router";
import Skeleton from "./Skeleton";
import Fallback from "./Fallback";

function MovieCard({ title, rating, id, posterPath }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Link to={`/movie/${id}`} className="block h-full">
      <div className="movie-card bg-dark-blue-400  grid h-full overflow-hidden rounded-lg text-center shadow-lg">
        <div className="poster-container relative aspect-4/5 overflow-hidden rounded-lg p-5">
          {posterPath ? (
            <>
              {isImageLoading && <Skeleton />}

              <img
                onLoad={() => setIsImageLoading(false)}
                src={`https://image.tmdb.org/t/p/w300${posterPath}`}
                loading="lazy"
                className={`movie-poster h-full w-full rounded-lg object-cover shadow-lg transition-opacity duration-300 
                  ${isImageLoading ? "opacity-0" : "opacity-100"}`}
              />
            </>
          ) : (
            <Fallback />
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-2 pb-4">
          <p className="movie-title mb-2 line-clamp-2  text-lg font-semibold">
            {title}
          </p>
          <p className="bg-dark-blue-600 rounded-xl p-2 px-4 text-sm font-semibold">
            {rating === 0 ? "Movie not rated" : ` ⭐ ${rating} / 10`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
