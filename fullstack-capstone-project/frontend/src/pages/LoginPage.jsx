import React, { useState } from 'react';

const API_BASE = 'http://localhost:4000';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        setMessage(loginData.error || 'Login failed');
        return;
      }

      localStorage.setItem('authToken', loginData.token);

      // Use the freshly issued token to fetch the logged-in user's profile
      const profileResponse = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginData.token}`,
        },
      });

      if (profileResponse.ok) {
        setMessage(`Welcome back, ${loginData.firstName}!`);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default LoginPage;
