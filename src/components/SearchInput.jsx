function SearchInput({ searchQuery, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search for a movie..."
      value={searchQuery}
      onChange={onChange}
    ></input>
  );
}

export default SearchInput;
