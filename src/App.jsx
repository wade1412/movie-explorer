import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto p-2 min-h-screen max-w-11/12 md:max-w-4/5 lg:max-w-3/4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:showType/:id" element={<ShowDetailsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
