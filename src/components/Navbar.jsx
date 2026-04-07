import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex px-2 py-4 justify-around">
      <Link to="/" className="nav-item ">
        Home
      </Link>
      <Link to="/random">Random</Link>
    </nav>
  );
}

export default Navbar;
