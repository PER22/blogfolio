import { getProfileByIdRequest } from "../../../utilities/profiles-api";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../utilities/users-api";
import { Link, useParams } from "react-router-dom";
import "./ViewBioPageByUsername.css"
import BioCard from "../../../components/BioCard/BioCard";

export default function ViewBioPageByUsername({user}) {
    const [specifiedProfile, setSpecifiedProfile] = useState({});
    const [specifiedUser, setSpecifiedUser] = useState({});
    let { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempUser = await getUserByUsername(username);
                console.log(tempUser);
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
        <BioCard profile={specifiedProfile} user={specifiedUser}/>
        {user && <>{user &&  specifiedUser.username === user.username ? <Link to="/bio/edit">Edit Profile</Link>  : "" }</>}
    </>);
}