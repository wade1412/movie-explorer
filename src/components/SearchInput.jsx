function SearchInput({ searchQuery, onChange }) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-120">
        <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-3">
          <svg
            className="text-base h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className="search-input bg-dark-blue-600 focus:ring-dark-blue-100 block w-full rounded-xl p-3 ps-10 text-base shadow-xs transition-shadow duration-300 focus:ring-1 focus:outline-none"
          type="text"
          id="search"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={onChange}
        ></input>
      </div>
    </div>
  );
}

export default SearchInput;
