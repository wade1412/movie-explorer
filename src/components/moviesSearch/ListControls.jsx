import ListButton from "./ListButton";

function ListControls({ page, totalPages, changePageNumber }) {
  const getVisiblePages = () => {
    const PAGES_AROUND = 2;
    const start = Math.max(1, page - PAGES_AROUND);
    const end = Math.min(totalPages, page + PAGES_AROUND);

    let rangeArr = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (rangeArr[0] > 1) {
      rangeArr.unshift("...");
      rangeArr.unshift(1);
    }

    if (rangeArr.at(-1) < totalPages) {
      rangeArr.push("...");
      rangeArr.push(totalPages);
    }

    return rangeArr;
  };

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="bg-dark-blue-900 mx-auto mt-6 flex w-fit justify-center gap-4 rounded-xl px-6 py-4 text-xl">
      <ListButton
        text="Prev"
        isDisabled={!hasPrev}
        handleClick={() => changePageNumber(page - 1)}
      />

      <div className="flex items-center justify-between gap-2 px-4">
        {getVisiblePages().map((p, index) =>
          p === "..." ? (
            <span
              key={index === 1 ? "ellipsis-start" : "ellipsis-end"}
              className="pointer-events-none h-fit p-2 px-4"
            >
              {p}
            </span>
          ) : (
            <button
              key={p}
              onClick={() => changePageNumber(p)}
              disabled={p === page}
              className={`h-fit rounded-lg p-2 px-4 transition-colors ${p === page ? "bg-dark-blue-400" : "hover:bg-dark-blue-600 cursor-pointer"} `}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <ListButton
        text="Next"
        isDisabled={!hasNext}
        handleClick={() => changePageNumber(page + 1)}
      />
    </div>
  );
}

export default ListControls;
