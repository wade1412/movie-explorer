function ValueToggle({ value, toggleValue, valueOne, valueTwo }) {
  const isSecondVal = value?.toLowerCase() === valueTwo?.toLowerCase();

  return (
    <label className="bg-dark-blue-600 inline-flex cursor-pointer items-center justify-center rounded-2xl px-6 py-2 text-lg">
      <span
        className={`text-heading transition-colors duration-300 select-none ${!isSecondVal ? "text-white " : "text-dark-blue-200/60 "}`}
      >
        {valueOne}
      </span>
      <input
        type="checkbox"
        checked={isSecondVal}
        onChange={toggleValue}
        className="peer sr-only"
      />
      <div
        className="relative mx-3 h-5 w-9 rounded-full bg-dark-blue-900 transition-all 
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-dark-blue-100 
        after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 
        after:rounded-full after:bg-white after:transition-all after:content-[''] 
        peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full"
      ></div>
      <span
        className={`text-heading transition-colors font-medium duration-300 select-none ${isSecondVal ? "text-white" : "text-dark-blue-200/60"}`}
      >
        {valueTwo}
      </span>
    </label>
  );
}

export default ValueToggle;
