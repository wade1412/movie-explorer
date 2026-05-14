import ListButton from "../ShowsList/ListButton";
import ValueToggle from "../ValueToggle";
import GenreSelect from "./Selects/GenreSelect";
import SortSelect from "./Selects/SortSelect";

import {
  VOTE_AVERAGE_OPTIONS,
  VOTE_COUNT_OPTIONS,
} from "./Selects/selectOptions";
import ValueSlider from "./ValueSlider";
import { clearBtnStyles } from "./discoverStyles";

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
    <div className="flex flex-col flex-wrap text-base md:text-lg md:items-center gap-6 md:flex-row md:justify-center bg-dark-blue-800/50 p-4 rounded-2xl">
      {/*Main Filters: Row 1*/}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <ValueToggle
          value={showType}
          toggleValue={updateShowType}
          valueOne="Movie"
          valueTwo="TV"
        />
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

      {/*Sliders and Clear: Row 2*/}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-end position-center">
          <ValueSlider
            key={`voteAverage-${voteAverageRange[0]}${voteAverageRange[1]}`}
            labelText="Rating"
            minValue={0}
            maxValue={10}
            step={0.1}
            valueRange={voteAverageRange}
            updateValueRange={updateVoteAverageRange}
          />
          <ValueSlider
            key={`voteCount-${voteCountRange[0]}${voteCountRange[1]}`}
            labelText="Votes"
            minValue={0}
            maxValue={40000}
            step={100}
            valueRange={voteCountRange}
            updateValueRange={updateVoteCountRange}
          />

          <div className="sm:col-span-2 lg:col-span-1 flex justify-center">
            <ListButton
              style={`${clearBtnStyles} w-full sm:w-1/2 lg:w-full`}
              text="Clear Filters"
              handleClick={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
