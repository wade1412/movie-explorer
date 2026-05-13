import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RandomMoviePage from "./pages/RandomMoviePage";
import DiscoverPage from "./pages/DiscoverPage";
import ShowDetailsPage from "./pages/ShowDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto md:px-2 py-2 min-h-screen max-w-11/12 md:max-w-4/5 lg:max-w-3/4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:showType/:id" element={<ShowDetailsPage />} />
          <Route path="/random" element={<RandomMoviePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
