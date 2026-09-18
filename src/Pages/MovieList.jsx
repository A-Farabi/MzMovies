import React, { useEffect, useState } from 'react'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState("")
  const [loading, setloading] = useState(true)
  console.log(movies)

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows`)
      .then(res => {
        if (!res.ok)
          throw new Error("Failed to fetch");
        return res.json()
      })
      .then(data => setMovies(data))
      .catch(error => setError(error.message))
      .finally(() => setloading(false))
  }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-6'>
      {movies.map((movie) => (
        <div key={movie.id} className='card bg-black shadow-xl'>
          <figure className='relative h-[220px] w-full'>
            <img src={movie.image.medium} alt={movie.name} className='w-full h-full object-cover'></img>
          <div className='absolute bottom-0 right-0 bg-black/80 p-1'>
<span className='text-yellow-400'>★ {movie.rating?.average || 'N/A'}</span>
          </div>
          </figure>
          <div className='p-2'>
            <h3 className='text-lg text-white truncate' title={movie.name}>
              {movie.name}
            </h3>
            <p className='text-gray-500 text-sm'>
              {movie.premiered ? movie.premiered.split('-')[0] : 'Unknown Year'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
