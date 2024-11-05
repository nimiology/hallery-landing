import React, { useState, useEffect } from 'react';
import './Profile.css';
import './Home.css';
import { useParams } from "react-router-dom"; // For getting the profileId from URL

const Profile = () => {
    const { profileId } = useParams(); // Assuming `profileId` will be part of the URL
    const [profileData, setProfileData] = useState(null);

    // Fetch profile data when component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`https://api.hallery.art/user/get/${profileId}/`);
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [profileId]);

    // Handler for opening the app (you can adjust the link as necessary)
    const handleOpenApp = () => {
        window.open(`hallery://profile/${username}`); // Replace with your actual app's link
    };

    if (!profileData) {
        return (<div className="main-content" style={{justifyContent: 'center'}}>
            <div className="profile-container">
                <h1 className="username">loading...</h1>
            </div>
        </div>); // Loading state while data is being fetched
    }

    const {profile_img, username, name} = profileData;

    return (
        <div className="main-content" style={{justifyContent: 'center'}}>
            <div className="profile-container">
                <img src={profile_img} alt="Profile" className="profile-image"/>
                <h1 className="username">{username}</h1>
                <h2 className="name">{name}</h2>
                <button className="open-app-button" onClick={handleOpenApp}>
                    Open the App
                </button>
            </div>
        </div>
    );
};

export default Profile;
