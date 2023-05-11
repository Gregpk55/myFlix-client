import React from 'react';
import { Link } from 'react-router-dom';

function UserInfo({ email, name }) {
  return (
    <>
      <p>User: {name}</p>
      <p>Email: {email}</p>
    </>
  );
}

export default UserInfo;
