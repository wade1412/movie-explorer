import GenreSelect from "./GenreSelect";
import SortSelect from "./SortSelect";

function FilterBar({
  showType,
  currentSort,
  onSortChange,
  genresList,
  selectedGenres,
  setSelectedGenres,
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
