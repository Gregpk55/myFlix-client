import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://greg-kennedy-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data, data');
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <div>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col
            md={8}
            style={{ border: '2px solid black' }}
          >
            <MovieView
              style={{ border: '2px solid black' }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : (
          <>
            {movies.length === 0 ? (
              <p>The list is empty!</p>
            ) : (
              <>
                {movies.map((movie) => (
                  <Col
                    key={movie.id}
                    md={3}
                  >
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
                ))}
              </>
            )}
          </>
        )}
      </Row>
      {user && (
        <Row className="justify-content-md-center fixed-top">
          <Col md={12}>
            <Button
              outline="black"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
              block="true"
              style={{ opacity: 0.7 }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
