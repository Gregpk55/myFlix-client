import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedBirthday = new Date(birthday).toDateString();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: formattedBirthday,
    };

    fetch('https://greg-kennedy-myflix.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };
  const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="forUsername">
        <Form.Label style={{ color: 'white' }}>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label style={{ color: 'white' }}>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label style={{ color: 'white' }}>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label style={{ color: 'white' }}>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={formatBirthday(birthday)}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        style={{ margin: '5px' }}
      >
        Sign Up
      </Button>
    </Form>
  );
};
