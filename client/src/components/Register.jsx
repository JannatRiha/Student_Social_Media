// client/src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

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

      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('/api/auth/register', body, config);

      console.log(res.data); // Log the JWT token
      localStorage.setItem('token', res.data.token); // <-- Add this line to save the token

      navigate('/timeline'); // <-- Changed redirect to timeline
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Sign Up</h1>
      <form className="register-form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

export default Register;