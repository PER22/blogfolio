import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({setUser}){
  const [formData, setFormData] = useState ({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const form = formData;
      delete form.confirm;
      delete form.error;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(form);
      // Update user state with user
      setUser(user);
    } catch {
      // Invalid signup
      setFormData((prevState) => ({
        ...prevState,
        error: 'Sign Up Failed - Try Again',
      }));
    }
  }

  const handleChange = (evt) => {
    setFormData({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  }

  const disable = formData.password !== formData.confirm;
  
  return (
    <>
      <div className="info-card">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          /><br/>

          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          /><br/>

          <label>Email</label><br/>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          /><br/>

          <label>Password</label><br/>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          /><br/>

          <label>Confirm</label><br/>
          <input 
            type="password" 
            name="confirm" 
            value={formData.confirm} 
            onChange={handleChange} 
            required 
          /><br/>

          <button 
            className="auth-submit-button" 
            type="submit" 
            disabled={disable}
          >Sign Up</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </>
  );
}
