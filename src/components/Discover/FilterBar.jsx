import ListButton from "../MoviesList/ListButton";
import SortSelect from "./SortSelect";

function FilterBar({ currentSort, onSortChange }) {
  return (
    <div className="flex gap-4 justify-center">
      <SortSelect onSortChange={onSortChange} currentSort={currentSort} />
    </div>
  );
}

export default FilterBar;
