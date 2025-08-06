// client/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ email, password });
      const res = await axios.post('/api/auth/login', body, config);

      console.log(res.data); // This should log the JWT token
      localStorage.setItem('token', res.data.token); // <-- Add this line to save the token

      navigate('/timeline'); // Redirect to the timeline
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Log In" />
      </form>
    </div>
  );
};

export default Login;