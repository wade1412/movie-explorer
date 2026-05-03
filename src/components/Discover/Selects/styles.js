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
