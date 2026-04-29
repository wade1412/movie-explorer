import { SORT_OPTIONS } from "../../services/constants";
import ListButton from "../MoviesList/ListButton";

function SortSelect({ currentSort, onSortChange }) {
  const [value, order] = currentSort.split(".");
  const isDesc = order === "desc";

  const handleValueChange = (e) => {
    const newVal = e.target.value;
    if (newVal) {
      onSortChange(`${newVal}.${isDesc ? "desc" : "asc"}`);
    }
  };

  const toggleOrder = () => {
    if (value) {
      onSortChange(`${value}.${isDesc ? "asc" : "desc"}`);
    }
  };

  return (
    <div className="flex gap-4 ">
      <select
        className="bg-dark-blue-600 rounded-xl px-4 text-lg border-2 border-transparent focus:border-2 focus:border-dark-blue-200 focus:bg-dark-blue-400 outline-0 transition-colors transition-duration-350"
        value={value}
        onChange={handleValueChange}
      >
        <option value="" className="text-dark-blue-100 p-2">
          Sort by...
        </option>
        {Object.values(SORT_OPTIONS).map(({ value, label }) => (
          <option className="rounded-lg p-2" key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ListButton
        text={
          <div
            className={`inline-block transition-transform duration-350 ${isDesc ? "rotate-180" : "rotate-0"}`}
          >
            ^
          </div>
        }
        isDisabled={false}
        handleClick={toggleOrder}
      />
    </div>
  );
}

export default SortSelect;
