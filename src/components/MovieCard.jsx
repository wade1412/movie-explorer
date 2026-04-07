import { Link } from "react-router";

function MovieCard({ title, rating, id, overwiew }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className="movie-card">
        <p>Title: {title}</p>
        <p>Rating: {rating}</p>
        <p>{overwiew}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
