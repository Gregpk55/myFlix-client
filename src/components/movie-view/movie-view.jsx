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

  const initialIsFavorite = user && user.FavoriteMovies?.includes(movie.id);
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
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div className="d-flex">
                  <Card.Img
                    src={movie.image}
                    className="movie-image"
                  />
                  <div>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Link
                    to={`/`}
                    className="mr-3"
                  >
                    <Button
                      variant="primary"
                      className="my-3"
                      style={{ width: '80px', cursor: 'pointer' }}
                    >
                      Back
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    className="my-3"
                    style={{ width: 'auto', cursor: 'pointer' }}
                    onClick={isFavorite ? deleteFavorite : addFavorite}
                  >
                    {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
