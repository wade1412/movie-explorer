function ShowSelect({ showType, toggleShowType }) {
  const isTV = showType === "tv";
  return (
    <label className="bg-dark-blue-600 inline-flex cursor-pointer items-center justify-center rounded-2xl py-2 px-6 text-lg">
      <span
        className={`text-heading  select-none transition-color duration-350 ${!isTV ? "text-white " : "text-dark-blue-200 "}`}
      >
        Movie
      </span>
      <input
        type="checkbox"
        checked={isTV}
        onChange={toggleShowType}
        className="peer sr-only"
      />
      <div className="bg-dark-blue-800 bg-neutral-quaternary peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft peer peer-checked:after:border-buffer peer-checked:bg-brand relative mx-3 h-5 w-9 rounded-full peer-focus:ring-2  peer-focus:ring-dark-blue-100 peer-focus:outline-none after:absolute after:inset-s-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
      <span
        className={`text-heading font-medium select-none transition-color duration-350 ${isTV ? "text-white" : "text-dark-blue-200"}`}
      >
        TV
      </span>
    </label>
  );
}

export default ShowSelect;
