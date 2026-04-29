import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import RandomMoviePage from "./pages/RandomMoviePage";
import DiscoverMoviePage from "./pages/DiscoverMoviePage";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto px-4 py-2 h-max">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/random" element={<RandomMoviePage />} />
          <Route path="/discover" element={<DiscoverMoviePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
