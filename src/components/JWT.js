import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export const AuthView = () => {
  // state
  const [toys, setToys] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //   helpers
  const fetchToys = async () => {
    try {
      // TODO if token is undefined or expired let the user know
      // use modal
      const cookie = new Cookies();
      const token = cookie.get('token');

      const headers = { Authorization: `Bearer ${token}` };

      const { data } = await axios.get('http://localhost:8000/toys/', {
        headers,
      });
      //   update our state with fetched toys
      setToys(data);
    } catch (err) {
      console.log(err);
    }
  };

  const listToys = () => (
    <ul>
      {toys.map(({ name, category, owner, id }) => {
        return (
          <li key={id}>
            <h3>{name}</h3>
            <h6>{category}</h6>
            <p>{owner}</p>
          </li>
        );
      })}
    </ul>
  );

  const changeUser = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      const { access, refresh } = data;
      const cookie = new Cookies();

      // localStorage.setItem('token', acces)
      cookie.set('token', access, { path: '/' });
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
      {listToys()}
    </div>
  );
};
