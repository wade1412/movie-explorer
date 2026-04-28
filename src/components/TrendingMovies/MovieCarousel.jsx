import useMeasure from "react-use-measure";
import MovieCard from "../MovieCard/MovieCard";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { animate } from "motion";

function MovieCarousel({ movies }) {
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -(width / 2) - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 60,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <div className="overflow-hidden bg-dark-blue-800 py-4 sm:py-6 lg:py-8 rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        className="flex w-max gap-4 shrink-0"
        ref={ref}
        style={{ x: xTranslation }}
      >
        {[...movies, ...movies].map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="shrink-0 w-35 sm:w-45 md:w-55 lg:w-62.5 "
          >
            <MovieCard
              style="movie-trending-card"
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default MovieCarousel;
