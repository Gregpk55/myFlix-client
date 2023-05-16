import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import '../main-view/main-view.scss';
import moment from 'moment';

export const ProfileView = ({ user, movies, onLoggedOut, updateUser }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const { movieId } = useParams;

  const [username, setUsername] = useState(storedUser.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(storedUser.Email);
  const [birthday, setBirthday] = useState(storedUser.Birthday);
  const token = localStorage.getItem('token');
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState(storedUser.FavoriteMovies);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
    setShowEditForm(false);
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  function getFavoriteMovies() {
    if (movies && movies.length > 0) {
      return movies.filter((movie) => favoriteMovieIds.includes(movie.id));
    }
    return [];
  }

  const toggleFavoriteMovie = (movieId) => {
    if (favoriteMovieIds.includes(movieId)) {
      // Remove from favorites
      const updatedFavoriteMovieIds = favoriteMovieIds.filter((id) => id !== movieId);
      setFavoriteMovieIds(updatedFavoriteMovieIds);
    } else {
      // Add to favorites
      const updatedFavoriteMovieIds = [...favoriteMovieIds, movieId];
      setFavoriteMovieIds(updatedFavoriteMovieIds);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthday,
      favoriteMovies: favoriteMovieIds,
    };

    fetch(`https://greg-kennedy-myflix.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Update failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('Update Successful');
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteAccount = () => {
    fetch(`https://greg-kennedy-myflix.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((deletedUser) => {
        if (deletedUser) {
          alert(`Successfully deleted ${user.Username}`);
          //<Navigate to="/signup" />;
        } else {
          alert('Could not delete account');
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col
        xs={12}
        md={4}
      >
        <Button
          variant="primary"
          onClick={handleShowDetails}
        >
          Details
        </Button>
      </Col>

      {showDetails && !showEditForm && (
        <Card>
          <Card.Body>
            <Card.Text>Username: {username}</Card.Text>
            <Card.Text>Birthday: {moment(birthday).format('YYYY-MM-DD')}</Card.Text>

            <Card.Text>Email: {email}</Card.Text>
            <Button onClick={handleEditClick}>Edit</Button>
          </Card.Body>
        </Card>
      )}

      {showEditForm && (
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label style={{ color: 'white' }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label style={{ color: 'white' }}>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(birthday).format('DD-MM-YYYY')}
                  onChange={(event) => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
              >
                Save Changes
              </Button>
              <Button
                variant="danger"
                onClick={deleteAccount}
              >
                <Link
                  onClick={onLoggedOut}
                  to="/signup"
                  style={{ color: 'white' }}
                >
                  Delete Account
                </Link>
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Col
        xs={12}
        className="mt-4"
      >
        <h2 style={{ color: 'white' }}>Favorite Movies</h2>
        <div className="movie-list">
          {getFavoriteMovies().map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
            />
          ))}
        </div>
      </Col>
    </>
  );
};
