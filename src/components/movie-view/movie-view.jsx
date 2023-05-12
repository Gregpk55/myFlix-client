import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const user = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);

  // Check if the user is logged in and has any favorite movies
  const initialIsFavorite = user && user.FavoriteMovies?.includes(movie.id);

  // Use the initialIsFavorite value as the initial state value for setIsFavorite
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
    window.scrollTo(0, 0);
  }, [initialIsFavorite]);

  const addFavorite = () => {
    fetch(`https://greg-kennedy-myflix.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        //if (updatedUser.favoriteMovies && updatedUser.favoriteMovies.includes(movieId)) {
        if (updatedUser.FavoriteMovies?.includes(movieId)) {
          alert(`Successfully added ${movie.title} to favorites`);
          setIsFavorite(true);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          alert('Failed');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteFavorite = () => {
    fetch(`https://greg-kennedy-myflix.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          alert(`Successfully removed ${movie.title} from favorites`);
          setIsFavorite(false);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="movie-view-container">
      <Container>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Img
                variant="top"
                src={movie.image}
                className="w-100"
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <span style={{ marginRight: '5px' }}>Description:</span>
                  <span>{movie.description}</span>
                  <br />
                  <span style={{ marginRight: '5px' }}>Genre:</span>
                  <span>{movie.genre}</span>
                  <br />
                  <span style={{ marginRight: '5px' }}>Director:</span>
                  <span>{movie.director}</span>
                  <br />
                  <Link
                    to={`/`}
                    className="d-flex justify-content-between"
                  >
                    <Button
                      variant="primary"
                      className="mx-auto my-3"
                      style={{ width: '80px', cursor: 'pointer' }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      className="mx-auto my-3"
                      style={{ width: '100px', cursor: 'pointer' }}
                      onClick={isFavorite ? deleteFavorite : addFavorite}
                    >
                      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
