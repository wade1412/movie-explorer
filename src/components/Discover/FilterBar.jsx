import GenreSelect from "./Selects/GenreSelect";
import SortSelect from "./Selects/SortSelect";
import VoteSelect from "./Selects/VoteSelect";
import {
  VOTE_AVERAGE_OPTIONS,
  VOTE_COUNT_OPTIONS,
} from "./Selects/selectOptions";

function FilterBar({
  showType,
  currentSort,
  onSortChange,
  genresList,
  selectedGenres,
  setSelectedGenres,
  voteAverage,
  updateVoteAverage,
  voteCount,
  updateVoteCount,
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
      <VoteSelect
        placeholder="Rating..."
        options={VOTE_AVERAGE_OPTIONS}
        voteValue={voteAverage}
        updateVoteValue={updateVoteAverage}
      />
      <VoteSelect
        placeholder="Vote count..."
        options={VOTE_COUNT_OPTIONS}
        voteValue={voteCount}
        updateVoteValue={updateVoteCount}
      />
    </div>
  );
}

export default FilterBar;
