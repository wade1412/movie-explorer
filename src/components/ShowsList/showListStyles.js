// Motion Variants
export const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -10 },
};

export const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

//Tailwind Classes

export const gridClass =
  "grid grid-cols-1 gap-6 transition-opacity duration-300 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ";

export const headingClass =
  "text-3xl font-bold mx-auto text-center p-5 mt-10 rounded-xl bg-dark-blue-200 max-w-1/2";
