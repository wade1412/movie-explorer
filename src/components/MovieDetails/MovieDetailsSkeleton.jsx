import { Skeleton } from "@mui/material";

function MovieDetailsSkeleton() {
  return (
    <section className="mx-auto max-w-5xl p-6">
      <div className="grid justify-center gap-6 md:grid-cols-2">
        <div className="bg-dark-blue-200 flex h-125 animate-pulse items-center overflow-hidden rounded-2xl shadow-2xl"></div>

        <div className="flex flex-col gap-6">
          <div className="bg-dark-blue-700 border-dark-blue-200 flex h-30 animate-pulse flex-col gap-1 rounded-2xl border px-2 py-3 shadow-lg"></div>

          <div className="bg-dark-blue-700 border-dark-blue-200 mx-auto flex h-50 w-full animate-pulse flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg"></div>

          <div className="bg-dark-blue-700 border-dark-blue-200 mx-auto flex h-30 w-full animate-pulse flex-col gap-4 rounded-xl border px-4 py-4 shadow-lg"></div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailsSkeleton;
