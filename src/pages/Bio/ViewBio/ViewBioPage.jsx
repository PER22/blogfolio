import { getProfileRequest } from "../../../utilities/profiles-api";
import { useEffect, useState } from "react";
import { getToken, getUser } from "../../../utilities/users-service";
import { Link } from "react-router-dom";
import "./ViewBioPage.css"

export default  function ViewBioPage({user}){
    const [profile, setProfile] = useState({});

    useEffect(()=>{

        const user = getUser();
        if(user){
            async function getProfile(){
                const profile = await getProfileRequest();        
                setProfile(profile);
            }
            getProfile();
        }
    
    }
    , [])
    return (<>
        <div className="info-card">
            <div className="profile-pic-and-name">
                <img className="profile-pic" alt="Profile Pic" src={profile.profilePicture}/>
                <h3>@{user.name}</h3>
            </div>
        <h4>{profile.bio_string}</h4>
        
        </div>
        <Link to="/bio/edit">Edit Profile</Link>
    </>);
}