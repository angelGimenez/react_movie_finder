/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css'
import { useState, useCallback } from 'react'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

export default function App() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(false)

  const {errorSearch} = useSearch({search})
  const {getMovies, loading, errorMovies, sortedMovies} = useMovies({search, sort})

  function handleSubmit (event) {
    event.preventDefault()
    getMovies({search})
  }

  function handleChange (event) {
    const newSearch = event.target.value
    //Forma ideal (no controlada por React)
    //const {query} = Object.fromEntries(new window.FormData(event.target))
    //Forma no ideal (controlada por React)
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  function handleSort() {
    setSort(!sort)
  }

  const debouncedGetMovies = useCallback(
    debounce(newSearch => {
      getMovies({search: newSearch})
    }, 300)
    , []
  )

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' style={{
            border: '1px solid transparent',
            borderColor: errorSearch ? 'red' : 'transparent'
          }}></input>
          <input type='checkbox' id='ordenar' name='ordenar' onChange={handleSort} checked={sort} />
          <label htmlFor='ordenar'>Ordenar alfabéticamente</label>
          {/*<button type='submit'>Buscar</button>*/}
        </form>
        {errorSearch && <p style={{color: 'red'}}>{errorSearch}</p>}
        {errorMovies && <p style={{color: 'red'}}>{errorMovies}</p>}
      </header>
      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={sortedMovies} />}
      </main>
    </div>
  )
}