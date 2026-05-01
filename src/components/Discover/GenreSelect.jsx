import { useMemo } from "react";
import Select from "react-select";

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
          control: ({ isFocused }) => `
            !rounded-xl !p-2 !px-6 !text-lg  !transition-color !duration-350
            ${isFocused ? "!bg-dark-blue-400" : "!bg-dark-blue-600 "}
          `,

          valueContainer: () => "gap-2",

          placeholder: () => "!text-dark-blue-100",

          input: () => "!text-white",

          menu: () =>
            "!bg-dark-blue-600 !rounded-xl !mt-2 !overflow-hidden !border !border-dark-blue-400 !z-50",

          menuList: () => "!p-1",
          option: ({ isFocused, isSelected }) => `
            !px-4 !py-2 !cursor-pointer !rounded-lg !transition-colors !text-white
            ${isSelected ? "!bg-dark-blue-200" : ""}
            ${isFocused && !isSelected ? "!bg-dark-blue-400" : ""}
          `,

          multiValue: () =>
            "!bg-dark-blue-400 !rounded-lg !text-white !border !border-dark-blue-200 !flex !items-center",
          multiValueLabel: () => "!text-white !text-sm !px-2 !py-0.5",
          multiValueRemove: () =>
            "!text-dark-blue-100 hover:!bg-red-500 hover:!text-white !rounded-r-lg !px-1 !transition-colors",

          indicatorsContainer: () => "ml-4 gap-1",
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
