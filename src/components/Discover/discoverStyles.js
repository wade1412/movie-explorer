export const controlStyle = ({ isFocused }) => `
          !rounded-xl !p-2 !px-6 !text-lg !transition-color !duration-350
          ${isFocused ? "!bg-dark-blue-400" : "!bg-dark-blue-600"}
          `;

export const menuStyle = () =>
  "!bg-dark-blue-600 !rounded-xl !mt-2 !overflow-hidden !border !border-dark-blue-400 !z-50";

export const optionStyle = ({ isFocused, isSelected }) => `
          !px-4 !py-2 !cursor-pointer !rounded-lg !transition-colors !text-white
          ${isSelected ? "!bg-dark-blue-200" : ""}
          ${isFocused && !isSelected ? "!bg-dark-blue-400" : ""}
          `;

export const sliderSx = {
  color: "#3e4556",
  height: 6,
  padding: "10px",
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#a1adbd",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#1e293b",
    opacity: 1,
    border: "1px solid #d1d9e6",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#ffffff",
    border: "1px solid #1e293b",
    "&:hover, &.Mui-active": {
      boxShadow: "0px 0px 0px 8px rgba(116, 138, 174, 0.16)",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#1a1f2b",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "0.85rem",
    border: "1px solid #d1d9e6",
  },
};

export const clearBtnStyles = `min-w-40 font-semibold rounded-xl px-6 py-2 bg-dark-blue-800 border-2 border-dark-blue-600 hover:bg-dark-blue-400 cursor-pointer hover:-translate-y-1 hover:border-dark-blue-900 text-white transition-all duration-200 active:scale-95`;
