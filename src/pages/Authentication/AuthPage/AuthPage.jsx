import { useState } from 'react';
import LoginForm from '../../../components/LoginForm/LoginForm';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="content">
      {showLogin ?<h1>Log In</h1> : <h1>Sign Up</h1> }
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      <h3 className="toggle-login" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign Up Instead?' : 'Log In Instead?'}</h3>
    </main>
  );
}