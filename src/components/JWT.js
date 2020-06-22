import React, { useState } from 'react';
import axios from 'axios';

export const AuthView = () => {
  // state
  const [toys, setToys] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //   helpers
  const fetchToys = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/toys/');
      console.log(data, 'data<><><><><><');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('submited');
  };

  //   render
  return (
    <div>
      <h1>Hello world</h1>
      <form onSubmit={handleLogin}>
        <h3>Username</h3>
        <input type='text' />
        <h3>Password</h3>
        <input type='text' />
      </form>
      <br />
      <br />
      <br />
      <button onClick={fetchToys}>Load Toy List</button>
    </div>
  );
};
