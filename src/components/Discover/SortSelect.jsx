import Select from "react-select";
import { SORT_OPTIONS } from "../../services/constants";
import ListButton from "../MoviesList/ListButton";

function SortSelect({ showType, currentSort, onSortChange }) {
  const [value, order] = currentSort.split(".");
  const isDesc = order === "desc";

  const options = SORT_OPTIONS[showType];

  const handleValueChange = (selectedOption) => {
    if (selectedOption) {
      onSortChange(`${selectedOption.value}.${isDesc ? "desc" : "asc"}`);
    }
  };

  const toggleOrder = () => {
    if (value) {
      onSortChange(`${value}.${isDesc ? "asc" : "desc"}`);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Select
        unstyled
        options={options}
        placeholder="Sort by..."
        value={currentSort}
        onChange={handleValueChange}
        classNames={{
          control: ({ isFocused }) => `
          !rounded-xl !p-2 !px-6 !text-lg !transition-color !duration-350
          ${isFocused ? "!bg-dark-blue-400" : "!bg-dark-blue-600"}
          `,
          placeholder: () => "!text-dark-blue-100",
          menu: () =>
            "!bg-dark-blue-600 !rounded-xl !mt-2 !overflow-hidden !border !border-dark-blue-400 !z-50",
          menuList: () => "!p-1",
          option: ({ isFocused, isSelected }) => `
          !px-4 !py-2 !cursor-pointer !rounded-lg !transition-colors !text-white
          ${isSelected ? "!bg-dark-blue-200" : ""}
          ${isFocused && !isSelected ? "!bg-dark-blue-400" : ""}
          `,
          dropdownIndicator: () =>
            "!text-dark-blue-100 hover:!text-white !cursor-pointer ml-2",
        }}
      />

      <ListButton
        style={`rounded-2xl px-4 py-2 font-semibold transition-all bg-dark-blue-600 hover:bg-dark-blue-400 cursor-pointer hover:-translate-y-1`}
        text={
          <div
            className={`flex text-center align-center transition-transform duration-350 text-lg font-light h-fit ${isDesc ? "rotate-180" : "rotate-0"}`}
          >
            ⇪
          </div>
        }
        handleClick={toggleOrder}
      />
    </div>
  );
}

export default SortSelect;
