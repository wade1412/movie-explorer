function ShowToggle({ showType, toggleShowType }) {
  const isTV = showType === "tv";
  return (
    <label className="bg-dark-blue-600 inline-flex cursor-pointer items-center justify-center rounded-2xl px-6 py-2 text-lg">
      <span
        className={`text-heading transition-color duration-350 select-none ${!isTV ? "text-white " : "text-dark-blue-200 "}`}
      >
        Movie
      </span>
      <input
        type="checkbox"
        checked={isTV}
        onChange={toggleShowType}
        className="peer sr-only"
      />
      <div className="bg-dark-blue-800 bg-neutral-quaternary peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft peer peer-checked:after:border-buffer peer-checked:bg-brand peer-focus:ring-dark-blue-100 relative mx-3 h-5 w-9 rounded-full peer-focus:ring-2 peer-focus:outline-none after:absolute after:inset-s-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
      <span
        className={`text-heading transition-color font-medium duration-350 select-none ${isTV ? "text-white" : "text-dark-blue-200/80"}`}
      >
        TV
      </span>
    </label>
  );
}

export default ShowToggle;
