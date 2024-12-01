import { useState, useEffect, useRef } from 'react'

export function useSearch({search}) {

  const [errorSearch, setErrorSearch] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setErrorSearch('No se puede buscar una película vacía')
      return
    }
    
    if (search.match(/^\d+$/)) {
      setErrorSearch('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setErrorSearch('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    
    setErrorSearch(null)
  }, [search])

	return {errorSearch}
}