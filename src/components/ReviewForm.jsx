import { useState } from 'react'
import { getImageUrl } from '../api/tmdb'

export default function ReviewForm({ movie, onSubmit, onCancel }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      rating,
      comment,
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="review-form-overlay">
      <div className="review-form">
        <button className="close-btn" onClick={onCancel}>×</button>
        <div className="review-form-content">
          {getImageUrl(movie.poster_path) && (
            <img
              src={getImageUrl(movie.poster_path, 'w150')}
              alt={movie.title}
            />
          )}
          <h2>{movie.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="rating-group">
              <label>Voto:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <span
                    key={n}
                    className={`star ${n <= rating ? 'active' : ''}`}
                    onClick={() => setRating(n)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">{rating}/10</span>
            </div>
            <div className="comment-group">
              <label>Commento:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Scrivi la tua recensione..."
                rows={4}
              />
            </div>
            <button type="submit">Salva recensione</button>
          </form>
        </div>
      </div>
    </div>
  )
}
