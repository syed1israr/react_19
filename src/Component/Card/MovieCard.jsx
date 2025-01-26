import React from 'react'
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
    const { title, vote_average, 
        release_date, original_language, poster_path } = movie;
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '../public/no-movie.png'} alt="" />
        <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                <FaStar className='text-yellow-300'/>
                <p>{ vote_average ? vote_average.toFixed(1): 'N/A'}</p>
                </div>
                <span>●</span>
                <p className='lang'>{original_language}</p>
                <span>●</span>
                <p className='year'>
                    { release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard