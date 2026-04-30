import Select from "react-select";

function GenreSelect({ genres }) {
  const options = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  // bg-dark-blue-600 rounded-xl px-4 text-lg border-2 border-transparent focus:border-2 focus:border-dark-blue-200 focus:bg-dark-blue-400 outline-0 transition-colors transition-duration-350

  return (
    <div className="flex gap-4 items-center">
      <Select
        isMulti
        unstyled
        options={options}
        // value={selectedGenres}
        // onChange={handleGenresChange}
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
