import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
   
  

  useEffect(() => {
    if (!token) {
        return;
    }
    fetch('https://greg-kennedy-myflix.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data, data');
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
          }
        });

        setMovies(moviesFromApi);
      })
  }, [token])
  

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    )
  }

  if (selectedMovie) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }
//empty movies
  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout
      </button>
      <div>The list is empty!</div>
    </>
    );
  }


  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
