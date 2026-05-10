import { useSearchParams } from "react-router";
import { movieListSettings, tvListSettings } from "../constants";
import { useHomeList } from "../../../hooks/useHomeList";
import MovieList from "../../MoviesList/MovieList";
import HorizontalList from "./HorizontalList";
import ListSelect from "./ListSelect";
import { headingStyle, sectionStyle } from "../styles";

function HomePageList() {
  const [listParams, setListParams] = useSearchParams();

  // Movies params and data
  const selectedMovieList =
    listParams.get("movie_list") || movieListSettings[0].value;

  const {
    shows: movies,
    status: moviesStatus,
    errorMessage: moviesErrorMessage,
  } = useHomeList("movie", selectedMovieList);

  // TV params and data
  const selectedTvList = listParams.get("tv_list") || tvListSettings[0].value;

  const {
    shows: tvShows,
    status: tvStatus,
    errorMessage: tvError,
  } = useHomeList("tv", selectedTvList);

  const handleListChange = (e, showType) => {
    const value = e.target.value;
    setListParams((prev) => {
      prev.set(`${showType}_list`, value);
      return prev;
    });
  };

  return (
    <>
      <div className={sectionStyle}>
        <h2 className={headingStyle}>Movie picks 🎬</h2>
        <div className="px-4 py-2 mb-2">
          <ListSelect
            showType="movie"
            listSettings={movieListSettings}
            selectedList={selectedMovieList}
            handleListChange={handleListChange}
          />
        </div>
        <HorizontalList
          shows={movies}
          status={moviesStatus}
          errorMessage={moviesErrorMessage}
        />
      </div>

      <div className={sectionStyle}>
        <h2 className={headingStyle}>TV shows 📺</h2>
        <div className="px-4 py-2 mb-2">
          <ListSelect
            showType="tv"
            listSettings={tvListSettings}
            selectedList={selectedTvList}
            handleListChange={handleListChange}
          />
        </div>
        <HorizontalList
          shows={tvShows}
          status={tvStatus}
          errorMessage={tvError}
        />
      </div>
    </>
  );
}

export default HomePageList;
