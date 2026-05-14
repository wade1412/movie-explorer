import { useShowSearch } from "../../hooks/useShowSearch";
import ShowsList from "../ShowsList/ShowsList";
import ValueToggle from "../ValueToggle";
import SearchInput from "./SearchInput";

import { useSearchParams } from "react-router";

function ShowSearch({ showType, toggleShowType }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { shows, totalPages, status, errorMessage } = useShowSearch(
    showType,
    query,
    page,
  );

  const handleQueryChange = (e) => {
    setSearchParams((prev) => {
      prev.set("query", e.target.value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };

  return (
    <>
      <div className="flex w-full flex-col md:flex-row gap-4 items-stretch justify-center md:items-center md:max-w-2xl md:justify-around">
        <ValueToggle
          value={showType}
          toggleValue={toggleShowType}
          valueOne="Movie"
          valueTwo="Tv"
        />

        <SearchInput searchQuery={query} onChange={handleQueryChange} />
      </div>
      <ShowsList
        shows={shows}
        showType={showType}
        page={page}
        totalPages={totalPages}
        changePageNumber={handlePageChange}
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default ShowSearch;
