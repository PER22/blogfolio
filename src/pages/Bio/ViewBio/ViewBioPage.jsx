import { getProfileRequest } from "../../../utilities/profiles-api";
import { useEffect, useState } from "react";
import { getToken, getUser } from "../../../utilities/users-service";
import { Link } from "react-router-dom";

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
        
        <h2>{profile.bio_string}</h2>
        <img alt="Profile Pic" src={profile.profilePicture}/>
        <Link to="/bio/edit">Edit Profile</Link>
    </>);
}