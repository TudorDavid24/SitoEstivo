const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const options = {
  method: 'GET',
  headers: { accept: 'application/json' },
}

export async function searchMovies(query) {
  if (!API_KEY || API_KEY === 'la_tua_chiave_api_the_movie_database') {
    throw new Error('Inserisci la tua chiave API di TMDB nel file .env')
  }
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=it-IT`,
    options
  )
  if (!res.ok) throw new Error('Errore nella ricerca film')
  const data = await res.json()
  return data.results
}

export async function getPopularMovies() {
  if (!API_KEY || API_KEY === 'la_tua_chiave_api_the_movie_database') {
    throw new Error('Inserisci la tua chiave API di TMDB nel file .env')
  }
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT`,
    options
  )
  if (!res.ok) throw new Error('Errore nel caricamento film popolari')
  const data = await res.json()
  return data.results
}

export function getImageUrl(path, size = 'w200') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}
