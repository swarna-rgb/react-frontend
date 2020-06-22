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
      let token = localStorage.getItem('token');
      console.log(token);
      //   const { data } = await axios.get('http://localhost:8000/toys/');
      //   console.log(data, 'data<><><><><><');
    } catch (err) {
      console.log(err);
    }
  };

  const changeUser = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    console.log('submited');
    console.log(username, password, 'data to login');
    try {
      const { data } = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      const { access, refresh } = data;
      localStorage.setItem('token', access);
    } catch (err) {
      console.log(err);
    }
  };

  //   render
  return (
    <div>
      <h1>Hello world</h1>
      <form onSubmit={(e) => handleLogin(e, username, password)}>
        <h3>Username</h3>
        <input type='text' value={username} onChange={changeUser} />
        <h3>Password</h3>
        <input type='text' value={password} onChange={changePassword} />
        <button type='submit'>Login!</button>
      </form>
      <br />
      <br />
      <br />
      <button onClick={fetchToys}>Load Toy List</button>
    </div>
  );
};
