function ListSelect({ listSettings, selectedList, handleListChange }) {
  return (
    <div className="bg-dark-blue-600 border-dark-blue-600 flex w-fit items-center rounded-xl border-2">
      {listSettings.map((setting) => (
        <button
          key={`${setting.value}`}
          value={setting.value}
          onClick={handleListChange}
          className={`cursor-pointer rounded-xl px-4 py-2 transition-all duration-300 ${selectedList === setting.value ? " bg-dark-blue-900 scale-[0.98] text-amber-300 shadow-[inset_0px_4px_8px_rgba(0,0,0,0.5)]" : "bg-dark-blue-600 hover:bg-dark-blue-400 active:scale-95"} `}
        >
          {setting.label}
        </button>
      ))}
    </div>
  );
}

export default ListSelect;
