import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className='MovieContainer'>
      <p className='MovieTitle'>{movie.title}</p>
    </div>
  );
};

export default MovieCard;
