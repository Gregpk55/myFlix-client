import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function updateUser({ user, handleSubmit, handleUpdate }) {
  return (
    <Form
      className="profile-form"
      onSubmit={handleSubmit}
    >
      <h2>Edit Info</h2>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={user.Username}
          onChange={handleUpdate}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={user.Password}
          onChange={handleUpdate}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          defaultValue={user.Email}
          onChange={(e) => handleUpdate(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Update
      </Button>
    </Form>
  );
}

export default updateUser;
