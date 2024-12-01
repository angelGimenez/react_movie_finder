/* eslint-disable react/prop-types */

export function Movies({movies}) {

	const hasMovies = movies?.length > 0
	
	return (
		hasMovies ? <ListOfMovies movies={movies}/> : <NoMoviesResults/>
	)
}

function ListOfMovies({movies}) {
	return (
		<ul className='movies'> { movies.map(movie => 
			<li className='movie' key={movie.id}>
				<p>{movie.title}</p>
				<p>{movie.year}</p>
				<img src={movie.poster} alt={movie.title}></img>
			</li>
		)}</ul>
	)
}

function NoMoviesResults() {
	return (
		<p>No se encontraron películas para esta busqueda</p>
	)
}