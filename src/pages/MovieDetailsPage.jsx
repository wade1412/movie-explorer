import { useParams } from "react-router";

function MovieDetailsPage() {
  const { movieId } = useParams();

  return (
    <>
      <h1>Movie Details Page: {movieId}</h1>
    </>
  );
}

export default MovieDetailsPage;
