import GenreSelect from "./GenreSelect";
import SortSelect from "./SortSelect";

function FilterBar({
  showType,
  selectedGenres,
  setSelectedGenres,
  genresList,
  currentSort,
  onSortChange,
}) {
  return (
    <div className="flex gap-4 justify-center">
      <SortSelect
        showType={showType}
        onSortChange={onSortChange}
        currentSort={currentSort}
      />
      <GenreSelect
        labelText="Include:"
        genresList={genresList}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    </div>
  );
}

export default FilterBar;
