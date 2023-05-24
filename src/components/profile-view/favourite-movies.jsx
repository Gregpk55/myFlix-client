import React from 'react';
import { Link } from 'react-router-dom';

function FavoriteMovies({ favouriteMovieList, removeFav }) {
  return (
    <div>
      <h2>Favourite Movies</h2>
      {favouriteMovieList.map((movie) => {
        return (
          <div key={movie.id}>
            <img
              src={movie.ImagePath}
              alt={movie.Title}
            />
            <Link to={`/movies/${movie._id}`}>
              <h4>{movie.Title}</h4>
            </Link>
            <button
              variant="secondary"
              onClick={() => removeFav(movie._id)}
            >
              Remove from List
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
