import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex px-2 py-4 justify-around bg-dark-blue-700 rounded-b-xl">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/random" className="nav-item">
        Random
      </Link>
    </nav>
  );
}

export default Navbar;
