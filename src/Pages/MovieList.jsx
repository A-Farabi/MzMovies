import React, { useEffect, useState } from 'react'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState("")
  const [loading, setloading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")



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

  const fitleredMovie = movies.filter((movie) => movie.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return <div className="text-white p-10">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 p-10">Error: {error}</div>
  }

  const handleModal = (movie) => {
    setSelectedMovie(movie)
    document.getElementById('my_modal_1').showModal()
  }

  return (
    <>

      {/* search fn */}
      <div className='p-10'>
        <div className='flex justify-center'>
          <input type="text"
            placeholder='Search Movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='input input-bordered w-full max-w-md' />
        </div>
        {
          fitleredMovie.length === 0 && (
            <div className='text-center text-gray-400 py-10'>No Movies Found for ${searchTerm}</div>
          )
        }
      </div>
      {/* search fn end */}

      {/* movie grid */}
      <div className='p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6'>
        {fitleredMovie.map((movie) => (
          <div key={movie.id} className='card bg-black shadow-xl'>
            <figure className='relative h-[220px] w-full'>
              <img src={movie.image.medium} alt={movie.name} className='w-full h-full object-cover'></img>
              <div className='absolute bottom-0 right-0 bg-black/80 p-1'>
                <span className='text-yellow-400'>★ {movie.rating?.average || 'N/A'}</span>
              </div>
            </figure>
            <div className='flex justify-between items-center'>
              <div className=''>
                <h3 className='text-xs text-white truncate text-wrap' title={movie.name}>
                  {movie.name}
                </h3>
                <p className='text-gray-500 text-sm'>
                  {movie.premiered ? movie.premiered.split('-')[0] : 'Unknown Year'}
                </p>
              </div>
              <div>
                <button className='btn btn-xs' onClick={() => handleModal(movie)}>See Details</button>
              </div>
            </div>
          </div>
        ))}
        {/* modal fn */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box max-w-2xl bg-neutral text-neutral-content">
            {selectedMovie && (
              <>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-amber-50 hover:text-black">✕</button>
                </form>

                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={selectedMovie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
                    alt={selectedMovie.name}
                    className="w-full md:w-48 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl">{selectedMovie.name}</h3>

                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      <span className="text-yellow-400 font-bold">
                        ★ {selectedMovie.rating?.average || 'N/A'}
                      </span>
                      <span className="text-gray-400">
                        📅 {selectedMovie.premiered || 'Unknown'}
                      </span>
                      <span className="text-gray-400">
                        🌐 {selectedMovie.language || 'N/A'}
                      </span>
                      <span className="text-gray-400">
                        📺 {selectedMovie.status || 'N/A'}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedMovie.genres?.map((g, i) => (
                        <span key={i} className="badge badge-outline badge-sm">{g}</span>
                      ))}
                    </div>

                    <div
                      className="py-3 text-sm text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: selectedMovie.summary || 'No summary available.'
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {/* modal close fn */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default MovieList
