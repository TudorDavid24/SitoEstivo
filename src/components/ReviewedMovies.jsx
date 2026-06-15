import { getImageUrl } from '../api/tmdb'

export default function ReviewedMovies({ reviews, onDeleteReview }) {
  if (reviews.length === 0) {
    return (
      <div className="reviewed-empty">
        <p>Nessun film recensito ancora.</p>
        <p>Cerca un film e aggiungi la tua recensione!</p>
      </div>
    )
  }

  return (
    <div className="reviewed-list">
      {reviews.map((review) => (
        <div key={review.movieId} className="reviewed-card">
          {getImageUrl(review.posterPath) ? (
            <img
              src={getImageUrl(review.posterPath, 'w92')}
              alt={review.title}
            />
          ) : (
            <div className="movie-poster placeholder small">N/A</div>
          )}
          <div className="reviewed-info">
            <h3>{review.title}</h3>
            <span className="reviewed-rating">
              {'★'.repeat(review.rating)}{'☆'.repeat(10 - review.rating)}
            </span>
            <span className="reviewed-score">{review.rating}/10</span>
            {review.comment && <p className="reviewed-comment">{review.comment}</p>}
            <button
              className="delete-btn"
              onClick={() => onDeleteReview(review.movieId)}
            >
              Elimina
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
