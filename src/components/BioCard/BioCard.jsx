export default function BioCard({user, profile}) {
    return (<><div className="info-card">
        <div className="profile-pic-and-names">
            <img className="profile-pic" alt="Profile Pic" src={profile.profilePicture} />
            <div className="profile-names">
                <h2>{user.name}</h2>
                <h3>@{user.username}</h3>
                {profile.github_link && <h4><a href={profile.github_link}>Github</a></h4>}
            </div>
        </div>
        <h4>{profile.bio_string}</h4>
    </div>
    </>);
}