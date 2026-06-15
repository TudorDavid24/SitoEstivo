import { getImageUrl } from '../api/tmdb'

export default function MovieCard({ movie, onReview, isReviewed }) {
  return (
    <div className="movie-card">
      {getImageUrl(movie.poster_path) ? (
        <img
          src={getImageUrl(movie.poster_path, 'w200')}
          alt={movie.title}
          className="movie-poster"
        />
      ) : (
        <div className="movie-poster placeholder">N/A</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-year">
          {movie.release_date ? movie.release_date.slice(0, 4) : '?'}
        </p>
        <p className="movie-overview">{movie.overview}</p>
        {isReviewed ? (
          <span className="reviewed-badge">Già recensito</span>
        ) : (
          <button onClick={() => onReview(movie)}>Recensisci</button>
        )}
      </div>
    </div>
  )
}
