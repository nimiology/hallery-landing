import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './Profile.css';
import './Home.css';
import { useParams } from "react-router-dom"; // For getting the profileId from URL

const Profile = () => {
    const { profileId } = useParams(); // Assuming `profileId` will be part of the URL
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(false); // State for error handling

    // Fetch profile data when component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`https://api.hallery.art/user/get/${profileId}/`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`); // Throw an error if response is not OK
                }

                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError(true); // Set error state to true
            }
        };

        fetchProfileData();
    }, [profileId]);

    // Handler for opening the app
    const handleOpenApp = () => {
        if (profileData) {
            window.open(`hallery://profile/${profileData.username}`); // Use username from profile data
        }
    };

    if (error) {
        return (
            <div className="main-content" style={{ justifyContent: 'center' }}>
                <Helmet>
                    <title>Profile Not Found - Hallery</title>
                    <meta name="description" content="404 - The profile you are looking for does not exist." />
                </Helmet>
                <div className="profile-container">
                    <h1 className="username">404 - Profile Not Found</h1>
                </div>
            </div>
        ); // Show 404 message if there is an error
    }

    if (!profileData) {
        return (
            <div className="main-content" style={{ justifyContent: 'center' }}>
                <Helmet>
                    <title>Loading Profile - Hallery</title>
                    <meta name="description" content="Loading user profile data. Please wait." />
                </Helmet>
                <div className="profile-container">
                    <h1 className="username">Loading...</h1>
                </div>
            </div>
        ); // Loading state while data is being fetched
    }

    const { profile_img, username, name } = profileData; // Destructure profile data

    return (
        <div className="main-content" style={{ justifyContent: 'center' }}>
            <Helmet>
                <title>{`${name} - Profile on Hallery`}</title>
                <meta name="description" content={`View the profile of ${name} on Hallery. Follow for more updates.`} />
                <meta property="og:title" content={`${name}'s Profile`} />
                <meta property="og:description" content={`Explore ${name}'s artwork and connect on Hallery.`} />
                <meta property="og:image" content={profile_img} />
                <meta property="og:url" content={`https://hallery.art/profile/${profileId}`} />
            </Helmet>
            <div className="profile-container">
                {profile_img && (
                    <img src={profile_img} alt="Profile" className="profile-image" />
                )}
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
