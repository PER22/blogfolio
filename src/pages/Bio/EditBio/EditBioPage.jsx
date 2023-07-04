import React, { useState, useEffect } from 'react';
import { updateProfileRequest, getProfileByIdRequest, deleteProfileRequest } from '../../../utilities/profiles-api';
import './EditBioPage.css' 
import { Link } from 'react-router-dom';

export default function EditBioPage({user}) {
  const [profileData, setProfileData] = useState({
    bio_string: '',
    profilePicture: '',
    github_link: ''
  });
  const [error, setError] = useState('');

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const profile = await getProfileByIdRequest(user.profile);
      setProfileData({
        ...profileData,
        bio_string: profile.bio_string || '',
        profilePicture: profile.profilePicture || '',
        github_link: profile.github_link || ''
      });
    } catch (error) {
      console.log('Error fetching profile: ', error);
      setError(error);
    }
  };
  fetchProfile();
}, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateProfileRequest(user.profile, profileData);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };


  const deleteProf = async (event)=>{
    await deleteProfileRequest(user.profile);
  }

  return (
    <div>
      <h1 className="page-heading">Edit Profile</h1>
      <form className="info-card" onSubmit={handleSubmit}>
        <label>
          Bio: <br/>
        </label>
        <textarea 
          rows="15"
          cols="50"
          name="bio_string" 
          value={profileData.bio_string} 
          onChange={handleChange} 
          required
        />
        <label>
          Profile Picture Link: <br/>
        </label>
        <input
          type="text"
          name="profilePicture"
          value={profileData.profilePicture}
          onChange={handleChange}
          required
        />
        
        <label>
          Github Link:<br/>
        </label>
        <input
          type="text" 
          name="github_link" 
          value={profileData.github_link} 
          onChange={handleChange} 
        />
        
        <button type="submit">Update Profile</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div onClick={deleteProf}>Delete Profile?</div>
    </div>
  );
}
