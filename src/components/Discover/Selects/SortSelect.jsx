import Select from "react-select";
import ListButton from "../../MoviesList/ListButton";
import { controlStyle, menuStyle, optionStyle } from "./styles";
import { SORT_OPTIONS } from "./selectOptions";

function SortSelect({ showType, currentSort, onSortChange }) {
  const [value, order] = currentSort.split(".");
  const isDesc = order === "desc";
  const options = SORT_OPTIONS[showType];

  const selectedOption = options.find((opt) => opt.value === value) || null;

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
        value={selectedOption}
        onChange={handleValueChange}
        classNames={{
          control: controlStyle,
          placeholder: () => "!text-dark-blue-100",
          menu: menuStyle,
          menuList: () => "!p-1",
          option: optionStyle,
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
