import ListButton from "../MoviesList/ListButton";
import GenreSelect from "./GenreSelect";
import SortSelect from "./SortSelect";

function FilterBar({ showType, genres, currentSort, onSortChange }) {
  return (
    <div className="flex gap-4 justify-center">
      <SortSelect
        showType={showType}
        onSortChange={onSortChange}
        currentSort={currentSort}
      />
      <GenreSelect genres={genres} />
    </div>
  );
}

export default FilterBar;
