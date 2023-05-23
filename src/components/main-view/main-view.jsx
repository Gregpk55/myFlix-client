import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);

    const filtered = movies.filter((movie) => {
      const { title, genre, director } = movie;
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseTitle = title.toLowerCase();
      const lowerCaseGenre = genre.toLowerCase();
      const lowerCaseDirector = director.toLowerCase();

      return (
        lowerCaseTitle.includes(lowerCaseSearchQuery) ||
        lowerCaseGenre.includes(lowerCaseSearchQuery) ||
        lowerCaseDirector.includes(lowerCaseSearchQuery)
      );
    });

    setFilteredMovies(filtered);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://greg-kennedy-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log('main-view');
        const moviesFromApi = movies.map((movie) => {
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
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <div className="main-view">
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate
                      to="/login"
                      replace
                    />
                  ) : (
                    <Col md={5}>
                      <ProfileView
                        user={user}
                        movies={movies}
                        updateUser={(user) => {
                          setUser(user);
                          localStorage.setItem('user', JSON.stringify(user));
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate
                      to="/login"
                      replace
                    />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        user={user}
                        token={token}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate
                      to="/login"
                      replace
                    />
                  ) : filteredMovies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      <Row>
                        <Col
                          className="d-flex justify-content-center"
                          style={{ marginTop: 10, marginBottom: 20 }}
                        >
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                          ></input>
                        </Col>
                      </Row>
                      {filteredMovies.map((movie) => (
                        <Col
                          className="mb-4"
                          key={movie.id}
                          md={3}
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </div>
  );
};
