import { getProfileByIdRequest } from "../../../utilities/profiles-api";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../utilities/users-api";
import { Link, useParams } from "react-router-dom";
import "./ViewBioPageByUsername.css"

export default function ViewBioPageByUsername() {
    const [specifiedProfile, setSpecifiedProfile] = useState({});
    const [specifiedUser, setSpecifiedUser] = useState({});
    let { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempUser = await getUserByUsername(username);
                if (tempUser) {
                    setSpecifiedUser(tempUser);
                    const tempProfile = await getProfileByIdRequest(tempUser.profile);
                    setSpecifiedProfile(tempProfile);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [specifiedUser.profile, username]);

    return (<>
        <div className="info-card">
            <div className="profile-pic-and-names">
                <img className="profile-pic" alt="Profile Pic" src={specifiedProfile.profilePicture} />
                <div className="profile-names">
                    <h2>{specifiedUser.name}</h2>
                    <h3>@{specifiedUser.username}</h3>
                    {specifiedProfile.github_link && <h4><a href={specifiedProfile.github_link}>Github</a></h4>}
                </div>
            </div>
            <h4>{specifiedProfile.bio_string}</h4>
        </div>
        <Link to="/bio/edit">Edit Profile</Link>
    </>);
}