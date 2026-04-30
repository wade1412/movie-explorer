import { useState } from "react";
import { Link } from "react-router";
import Skeleton from "../Skeletons/SkeletonOverlay";
import Fallback from "../Skeletons/Fallback";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./movieCard.css";

function MovieCard({ style, title, rating, id, posterPath }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Link to={`/movie/${id}`} className="block h-full">
      <motion.div className={`${style}`}>
        <div className="poster-container p-2 lg:p-4">
          {posterPath ? (
            <>
              {isImageLoading && <Skeleton />}

              <img
                //avoid flicker on cached images, by using one frame
                onLoad={() => {
                  requestAnimationFrame(() => setIsImageLoading(false));
                }}
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                loading="lazy"
                className={`movie-poster h-full w-full rounded-lg object-cover shadow-lg transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
              />
            </>
          ) : (
            <Fallback />
          )}
        </div>

        <div className="movie-info flex flex-1 flex-col items-center justify-center gap-2 p-2">
          <p className="movie-title line-clamp-2  font-semibold">{title}</p>
          <p className="movie-rating bg-dark-blue-600 rounded-xl p-2 px-4 text-md font-semibold">
            {rating === 0 ? "Movie not rated" : ` ⭐ ${rating.toFixed(1)} / 10`}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default MovieCard;
