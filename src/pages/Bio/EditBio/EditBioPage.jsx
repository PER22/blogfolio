import React, { useState, useEffect } from 'react';
import { updateProfileRequest, getProfileByIdRequest, deleteProfileRequest } from '../../../utilities/profiles-api';
import './EditBioPage.css' 
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../utilities/users-service';

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

const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateProfileRequest(user.profile, profileData);
      navigate(`profile/${updatedProfile._id}`);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.log('Error updating profile:', error);
    }
  };


  const deleteProf = async (event)=>{
    try{
      await deleteProfileRequest(user.profile);
      logOut();
      navigate(`/`);
    }catch(err){
      
      setError("Failed to delete profile.");
      console.log("Error deleting profile:", err);
    }
    
  }

  return (
    <div>
      <h1 className="page-heading">Edit Profile</h1>
      <form className="info-card" onSubmit={updateProfile}>
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
