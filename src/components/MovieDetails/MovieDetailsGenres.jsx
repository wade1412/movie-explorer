function MovieDetailsGenres({ genres }) {
  return (
    <div className="flex items-center gap-2 w-full">
      Genres:{" "}
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="bg-dark-blue-900 rounded-lg px-2 py-1 text-base cursor-pointer"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}

export default MovieDetailsGenres;
