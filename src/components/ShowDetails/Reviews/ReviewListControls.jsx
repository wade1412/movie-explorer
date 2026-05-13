function ReviewListControls({ page, totalPages, handlePageChange }) {
  const isFirst = page === 1;
  const isLast = page === totalPages;

  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const buttonClass = (disabledCondition) =>
    `rounded-2xl px-2.5 py-1 font-semibold ${disabledCondition ? "bg-dark-blue-700 pointer-events-none text-dark-blue-400" : "cursor-pointer bg-dark-blue-600  hover:bg-dark-blue-400 hover:-translate-y-1 transition-all duration-300"}`;

  return (
    <div className="flex w-full justify-center items-center text-center gap-4 mt-2 py-1">
      <button
        disabled={isFirst}
        onClick={() => handlePageChange((prev) => prev - 1)}
        className={buttonClass(isFirst)}
      >{`<`}</button>

      <div className="flex gap-1 items-center">
        {pagesArray.map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={page === pageNumber} // Disabled on same page
            onClick={() => handlePageChange(pageNumber)}
            className={buttonClass(page === pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className={buttonClass(isLast)}
        disabled={isLast}
        onClick={() => handlePageChange((prev) => prev + 1)}
      >{`>`}</button>
    </div>
  );
}

export default ReviewListControls;
