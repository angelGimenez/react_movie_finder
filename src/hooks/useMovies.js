//import withResults from '../mocks/with-results.json'
//import withoutResults from '../mocks/no-results.json'
import { useState, useRef, useMemo, useCallback } from 'react'

export function useMovies({search, sort}) {
	const API_KEY = '961cfd18'
	const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`
	const [mappedMovies, setMappedMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorMovies, setErrorMovies] = useState(null)
	const previousSearch = useRef(search)
	
	const getMovies = useCallback(async ({search}) => {
		if (search === previousSearch.current) return
		if (search) {
			async function doGetMovies() {
				try {
					setLoading(true)
					setErrorMovies(null)
					previousSearch.current = search
					const response = await fetch(API_URL + search)
					const jsonResponse = await response.json()
					if (!response.ok){
						throw new Error(`Código error: ${response.status}`)
					}

					const movies = jsonResponse.Search
					const mappedMovies = movies?.map(movie => ({
						id: movie.imdbID,
						title: movie.Title,
						year: movie.Year,
						poster: movie.Poster
					}))
					
					setMappedMovies(mappedMovies)
				} catch (error){
					setErrorMovies(error.message)
					console.error(error.message)
				} finally {
					setLoading(false)
				}
			}
			doGetMovies()
		} else {
			return
		}
	}, [API_URL])

	const sortedMovies = useMemo(() => {
		return sort ? [...mappedMovies].sort((a, b) => a.title.localeCompare(b.title)) : mappedMovies
	}, [sort, mappedMovies])

  return {getMovies, loading, errorMovies, sortedMovies}
}