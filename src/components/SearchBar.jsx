import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cerca un film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={loading || !query.trim()}>
        {loading ? 'Cerco...' : 'Cerca'}
      </button>
    </form>
  )
}
