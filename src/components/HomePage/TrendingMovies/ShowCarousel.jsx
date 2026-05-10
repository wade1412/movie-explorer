// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { animate } from "motion";
import useMeasure from "react-use-measure";
import ShowCard from "../../ShowCard/ShowCard";

function ShowCarousel({ showType, shows }) {
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
    <div className="bg-dark-blue-800 overflow-hidden rounded-xl mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-4 sm:py-6 lg:py-8">
      <motion.div
        className="flex w-max shrink-0 gap-4"
        ref={ref}
        style={{ x: xTranslation }}
      >
        {[...shows, ...shows].map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="w-35 shrink-0 sm:w-45 md:w-55 lg:w-62.5"
          >
            <ShowCard
              showType={showType}
              style="movie-trending-card"
              id={movie.id}
              title={movie.title || movie.name}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ShowCarousel;
