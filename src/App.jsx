import { useState, useEffect, useCallback } from 'react'
import { searchMovies, getPopularMovies } from './api/tmdb'
import { useLocalStorage } from './hooks/useLocalStorage'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import ReviewForm from './components/ReviewForm'
import ReviewedMovies from './components/ReviewedMovies'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [tab, setTab] = useState('search')
  const [reviews, setReviews] = useLocalStorage('movie-reviews', [])

  useEffect(() => {
    getPopularMovies()
      .then(setMovies)
      .catch(() => {})
  }, [])

  const handleSearch = useCallback(async (query) => {
    setLoading(true)
    setError('')
    try {
      const results = await searchMovies(query)
      setMovies(results)
      if (results.length === 0) setError('Nessun film trovato.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  function handleOpenReview(movie) {
    setSelectedMovie(movie)
  }

  function handleSubmitReview(review) {
    setReviews((prev) => [review, ...prev])
    setSelectedMovie(null)
  }

  function handleDeleteReview(movieId) {
    setReviews((prev) => prev.filter((r) => r.movieId !== movieId))
  }

  const reviewedIds = new Set(reviews.map((r) => r.movieId))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Rater</h1>
        <nav className="tabs">
          <button
            className={tab === 'search' ? 'active' : ''}
            onClick={() => setTab('search')}
          >
            Cerca film
          </button>
          <button
            className={tab === 'reviews' ? 'active' : ''}
            onClick={() => setTab('reviews')}
          >
            Le mie recensioni ({reviews.length})
          </button>
        </nav>
      </header>

      <main>
        {tab === 'search' && (
          <section className="search-section">
            <SearchBar onSearch={handleSearch} loading={loading} />
            {error && <p className="error">{error}</p>}
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onReview={handleOpenReview}
                  isReviewed={reviewedIds.has(movie.id)}
                />
              ))}
            </div>
          </section>
        )}

        {tab === 'reviews' && (
          <section className="reviews-section">
            <h2>Le mie recensioni</h2>
            <ReviewedMovies
              reviews={reviews}
              onDeleteReview={handleDeleteReview}
            />
          </section>
        )}
      </main>

      {selectedMovie && (
        <ReviewForm
          movie={selectedMovie}
          onSubmit={handleSubmitReview}
          onCancel={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default App
