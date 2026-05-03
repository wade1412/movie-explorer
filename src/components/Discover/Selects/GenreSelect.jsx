import { useMemo } from "react";
import Select from "react-select";
import { controlStyle, menuStyle, optionStyle } from "./styles";

function GenreSelect({
  labelText,
  selectedGenres,
  setSelectedGenres,
  genresList,
}) {
  //Caching options to avoid array creation on every re-render
  const options = useMemo(
    () =>
      genresList.map((genre) => ({
        value: genre.id,
        label: genre.name,
      })),
    [genresList],
  );

  const selectedValues = useMemo(() => {
    if (!selectedGenres) return;

    const selectedSet = new Set(selectedGenres.split(","));
    return options.filter((opt) => selectedSet.has(String(opt.value)));
  }, [selectedGenres, options]);

  const handleGenresChange = (selectedOptions) => {
    const genreIds = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setSelectedGenres(genreIds);
  };

  return (
    <div className="flex text-lg gap-2 items-center">
      <label htmlFor="genre-select">{labelText}</label>
      <Select
        id="genre-select"
        isMulti
        unstyled
        options={options}
        value={selectedValues}
        onChange={handleGenresChange}
        placeholder="Pick genres..."
        noOptionsMessage={() => "Nothing found"}
        classNames={{
          control: controlStyle,

          valueContainer: () => "gap-2",

          placeholder: () => "!text-dark-blue-100",

          input: () => "!text-white",

          menu: menuStyle,

          menuList: () => "!p-1",
          option: optionStyle,

          multiValue: () =>
            "!bg-dark-blue-400 !rounded-lg !text-white !border !border-dark-blue-200 !flex !items-center",
          multiValueLabel: () => "!text-white !text-sm !px-2 !py-0.5",
          multiValueRemove: () =>
            "!text-dark-blue-100 hover:!bg-red-500 hover:!text-white !rounded-r-lg !px-1 !transition-colors",

          indicatorsContainer: () => "ml-2 gap-1",
          dropdownIndicator: () =>
            "!text-dark-blue-100 hover:!text-white !cursor-pointer",
          clearIndicator: () =>
            "!text-dark-blue-100 hover:!text-red-400 !cursor-pointer",
        }}
      />
    </div>
  );
}

export default GenreSelect;
