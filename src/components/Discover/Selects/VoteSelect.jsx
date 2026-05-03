import Select from "react-select";
import { controlStyle, menuStyle, optionStyle } from "./styles";

function VoteSelect({ placeholder, options, voteValue, updateVoteValue }) {
  const selectedOption =
    options.find((opt) => opt.value === Number(voteValue)) || null;

  const handleOptionChange = (selectedOption) => {
    updateVoteValue(selectedOption.value);
  };

  return (
    <Select
      unstyled
      options={options}
      placeholder={placeholder}
      value={selectedOption}
      onChange={handleOptionChange}
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
  );
}

export default VoteSelect;
