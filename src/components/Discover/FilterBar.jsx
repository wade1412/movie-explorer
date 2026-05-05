import ShowToggle from "./ShowToggle";
import GenreSelect from "./Selects/GenreSelect";
import SortSelect from "./Selects/SortSelect";
import ListButton from "../MoviesList/ListButton";
import {
  VOTE_AVERAGE_OPTIONS,
  VOTE_COUNT_OPTIONS,
} from "./Selects/selectOptions";
import ValueSlider from "./ValueSlider";

function FilterBar({
  filters,
  genresList,
  updateShowType,
  updateSort,
  updateGenres,
  updateVoteAverageRange,
  updateVoteCountRange,
  clearFilters,
}) {
  const { showType, sortBy, withGenres, voteAverageRange, voteCountRange } =
    filters;

  return (
    <div className="flex flex-col items-center gap-4 text-lg">
      <div className="flex gap-4 justify-center">
        <ShowToggle showType={showType} toggleShowType={updateShowType} />
        <SortSelect
          showType={showType}
          onSortChange={updateSort}
          currentSort={sortBy}
        />
        <GenreSelect
          labelText="Include:"
          genresList={genresList}
          selectedGenres={withGenres}
          setSelectedGenres={updateGenres}
        />
      </div>
      <div className="flex gap-10 justify-center items-center">
        <ValueSlider
          key={`vote-average-${voteAverageRange.join(",")}`}
          labelText="Rating"
          minValue={0}
          maxValue={10}
          step={0.1}
          valueRange={voteAverageRange}
          updateValueRange={updateVoteAverageRange}
        />
        <ValueSlider
          key={`vote-count-${voteCountRange.join(",")}`}
          labelText="Number of votes"
          minValue={0}
          maxValue={40000}
          step={100}
          valueRange={voteCountRange}
          updateValueRange={updateVoteCountRange}
        />

        <ListButton
          style={` text-dark-blue-100 font-semibold rounded-xl px-6 py-2 bg-dark-blue-800 border-2 border-dark-blue-600 hover:bg-dark-blue-400 cursor-pointer hover:-translate-y-1 hover:border-dark-blue-900 hover:text-white transition-all`}
          text="Clear"
          handleClick={clearFilters}
        />
      </div>
    </div>
  );
}

export default FilterBar;
