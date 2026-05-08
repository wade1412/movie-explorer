import { useSearchParams } from "react-router";
import { listSettings } from "./constants";
import { useHomeMoviesList } from "../../hooks/useHomeMoviesList";
import MovieList from "../MoviesList/MovieList";
import HorizontalList from "./HorizontalList";
import ListSelect from "./ListSelect";

function HomePageList() {
  const [listParams, setListParams] = useSearchParams();

  const selectedList = listParams.get("list") || "now_playing";

  const { movies, status, errorMessage } = useHomeMoviesList(
    listParams.get("list"),
  );

  const handleListChange = (e) => {
    const value = e.target.value;
    setListParams((prev) => {
      prev.set("list", value);
      return prev;
    });
  };

  return (
    <div className="bg-dark-blue-900 rounded-xl flex flex-col gap-2 p-2 text-lg">
      <div className="px-4 py-2">
        <ListSelect
          listSettings={listSettings}
          selectedList={selectedList}
          handleListChange={handleListChange}
        />
      </div>

      <HorizontalList
        movies={movies}
        status={status}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default HomePageList;
