import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import './BioCard.css'
export default function BioCard({specifiedUser, profile}) {
    return (<><div className="info-card">
        <div className="profile-pic-and-names">
            <img className="profile-pic" alt="Profile Pic" src={profile.profilePicture} />
            <div className="profile-names">
                <h2>{specifiedUser.name}</h2>
                <h3>@{specifiedUser.username}</h3>
                {profile.github_link && <h4><a href={profile.github_link}>Github</a></h4>}
            </div>
        </div>
        <ReactMarkdown>{profile.bio_string}</ReactMarkdown>
    </div>
    </>);
}