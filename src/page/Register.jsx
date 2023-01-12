import React, { useState } from 'react';
import '../components/Account/Login.css';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    
    const account = {
      'email': email,
      'password': password,
    }
  
    localStorage.setItem('user', JSON.stringify(account))
    alert('signup successful');
  }

  return (
    <div className="loginPage">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label style={{ display: 'flex' }}>Name</label>
            <input
              type="email"
              className="form-control mt-1"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              value={name}
            />
          </div>
          <div className="form-group mt-3">
            <label style={{ display: 'flex' }}>Username</label>
            <input
              type="email"
              className="form-control mt-1"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              value={username}
            />
          </div>
          <div className="form-group mt-3">
            <label style={{ display: 'flex' }}>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              value={password}
            />
          </div>
          <div className="form-group mt-3">
            <label style={{ display: 'flex' }}>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              value={email}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <p className="mt-3 mb-3">
            Already have an account? <a href="/login">Sign in now</a>
          </p>
        </div>
      </form>
    </div>
  );
}
