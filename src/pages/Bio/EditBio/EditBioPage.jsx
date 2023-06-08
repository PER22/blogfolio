import React, { useState, useEffect } from 'react';
import { updateProfileRequest, getProfileRequest } from '../../../utilities/profiles-api';

export default function EditBioPage() {
  const [profileData, setProfileData] = useState({
    bio_string: '',
    profilePicture: ''
  });
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const profile = await getProfileRequest();
      setProfileData({
        ...profileData,
        bio_string: profile.bio_string || '',
        profilePicture: profile.profilePicture || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
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
      const updatedProfile = await updateProfileRequest(profileData);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Bio:
          <textarea 
          name="bio_string" 
          value={profileData.bio_string} 
          onChange={handleChange} 
          required></textarea>
        </label>
        <label>
          Profile Picture Link:
          <input
            type="text"
            name="profilePicture"
            value={profileData.profilePicture}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
