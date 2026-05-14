// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";

const navbarVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    y: -15,
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
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/discover", label: "Discover" },
    { path: "/search", label: "Search" },
  ];

  return (
    <motion.nav
      className="flex flex-col gap-4 md:flex-row items-center justify-between px-8 py-4 mx-auto max-w-5xl backdrop-blur-md bg-dark-blue-800/80 rounded-b-2xl shadow-xl shadow-black/10 text-lg"
      variants={navbarVariants}
      animate="visible"
      initial="hidden"
    >
      <div className="text-dark-blue-100 font-bold text-lg tracking-wider">
        Movie Explorer
      </div>

      {/* Nav Menu */}
      <ul className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.li
              key={item.path}
              variants={childVariants}
              whileTap={{ scale: 0.96 }}
              className="relative py-1"
            >
              <Link
                to={item.path}
                className={`block font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-dark-blue-200"
                    : "text-white hover:-translate-y-1 "
                }`}
              >
                {item.label}
              </Link>

              {isActive && (
                <motion.div
                  layoutId="active-line"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark-blue-200 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

export default Navbar;
