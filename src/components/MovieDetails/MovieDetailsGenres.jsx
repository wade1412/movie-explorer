import { Link } from "react-router";

function MovieDetailsGenres({ genres }) {
  return (
    <div className="flex items-center gap-4 w-full font-semibold">
      Genres:{" "}
      <div className=" flex flex-wrap gap-2 px-2">
        {genres.map((genre) => (
          <Link
            to={`/discover?with_genres=${genre.id}`}
            key={genre.id}
            className="bg-dark-blue-700 rounded-lg px-3 py-1 text-base cursor-pointer hover:-translate-y-1 hover:bg-dark-blue-600 transition-all duration-300 font-light"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailsGenres;
