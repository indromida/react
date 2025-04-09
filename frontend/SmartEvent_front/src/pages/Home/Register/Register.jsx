import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Sign In
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      alert('Registration successful!');
    } else {
      alert('Sign In successful!');
    }
    // Add logic here to send the form data to a backend or API
  };

  return (
    <div className="register-container">
      <div className="toggle-section">
        <button
          className={`toggle-button ${isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
        <button
          className={`toggle-button ${!isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </button>
      </div>

      {isSignUp ? (
        <div className="form-section">
          <h2>Sign Up</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      ) : (
        <div className="form-section">
          <h2>Sign In</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;