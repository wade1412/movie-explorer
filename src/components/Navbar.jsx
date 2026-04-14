import { motion } from "motion/react";
import { Link } from "react-router";

const navbarVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const childVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

function Navbar() {
  return (
    <motion.ul
      className="flex px-2 py-4 justify-around bg-dark-blue-700 rounded-b-xl"
      variants={navbarVariants}
      animate="visible"
      initial="hidden"
    >
      <motion.li
        variants={childVariants}
        className="nav-item"
        whileHover={{ y: -3 }}
      >
        <Link to="/" className="font-semibold">
          Home
        </Link>
      </motion.li>
      <motion.li
        variants={childVariants}
        className="nav-item"
        whileHover={{ y: -3 }}
      >
        <Link to="/random" className="font-semibold ">
          Random
        </Link>
      </motion.li>
    </motion.ul>
  );
}

export default Navbar;
