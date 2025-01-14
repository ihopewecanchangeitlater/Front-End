import React, { useState } from 'react';
import axios from 'axios';


function Login({ onSignupClick }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/dealer/login', loginData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setStatusMessage(response.data);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      setStatusMessage('Error during login!');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <table>
        <tbody>
          <tr>
            <td>Email:</td>
            <td><input type="text" id="email" value={loginData.email} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" id="password" value={loginData.password} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>
      <button onClick={login}>Login</button>
      <div>{statusMessage}</div>
      <p>
        Don't have an account? <button onClick={onSignupClick}>Signup</button>
      </p>
    </div>
  );
}

export default Login;
