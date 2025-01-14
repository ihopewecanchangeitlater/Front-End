import React, { useState } from 'react';
import Login from './Login';
import Signup from './SignUp';

function AuthorizationPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <h2>Dealer Authorization</h2>
      {showLogin ? (
        <Login onSignupClick={() => setShowLogin(false)} />
      ) : (
        <Signup onLoginClick={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default AuthorizationPage;
