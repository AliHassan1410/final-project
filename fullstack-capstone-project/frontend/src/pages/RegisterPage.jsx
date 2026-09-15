import React, { useState } from 'react';

const API_BASE = 'http://localhost:4000';

function RegisterPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setMessage('Registration successful!');
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default RegisterPage;
