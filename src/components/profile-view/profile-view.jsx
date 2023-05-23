import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import '../main-view/main-view.scss';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';

//import { updateUser } from '../profile-view/update-user';

export const ProfileView = ({ user, movies, updateUser }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const { movieId } = useParams();

  const [username, setUsername] = useState(storedUser.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(storedUser.Email);
  const [birthday, setBirthday] = useState(moment(storedUser.Birthday).format('YYYY-MM-DD'));
  const navigate = useNavigate();

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
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      //favoriteMovies: favoriteMovieIds,
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
      .catch((error) => {
        alert(`Update failed: ${error.message}`);
      });
  };

  const deleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      fetch(`https://greg-kennedy-myflix.herokuapp.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((deletedUser) => {
          if (deletedUser) {
            alert(`Successfully deleted ${user.Username}`);
            navigate = '/signup'; // Redirect to signup
          } else {
            alert('Could not delete account');
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
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
          className="ms-auto btn-sm"
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
              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
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
                  value={moment(birthday).format('YYYY-MM-DD')}
                  onChange={(event) => setBirthday(event.target.value)}
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
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </Col>
    </>
  );
};
