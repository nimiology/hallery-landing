import React, {useState, useEffect} from 'react';
import './Profile.css';
import './Home.css';
import {useParams} from "react-router-dom"; // For getting the artworkId from URL

const Artwork = () => {
    const {artworkId} = useParams(); // Extracting artworkId from URL
    const [artworkData, setArtworkData] = useState(null);

    // Fetch artwork data when component mounts
    useEffect(() => {
        const fetchArtworkData = async () => {
            try {
                const response = await fetch(`https://api.hallery.art/art/artwork/${artworkId}/`);
                const data = await response.json();
                setArtworkData(data);
            } catch (error) {
                console.error("Error fetching artwork data:", error);
            }
        };

        fetchArtworkData();
    }, [artworkId]);

    // Handler for opening the app
    const handleOpenApp = () => {
        window.open(`hallery://artwork/${artworkId}`); // Link to open the app
    };

    if (!artworkData) {
        return (
            <div className="main-content" style={{justifyContent: 'center'}}>
                <div className="profile-container">
                    <h1 className="username">Loading...</h1>
                </div>
            </div>
        ); // Loading state while data is being fetched
    }

    // Destructure the necessary data
    const {owner, title, thumbnail} = artworkData;
    const {profile_img, username, name} = owner; // Extract owner data

    return (
        <div className="main-content" style={{justifyContent: 'center'}}>
            <div className="profile-container">
                {thumbnail &&(
                <img src={thumbnail} alt="Profile" className="artwork-thumbnail"/>)}
                <h1 className="username">{title}</h1>
                <h2 className="name">{name}</h2>
                <button className="open-app-button" onClick={handleOpenApp}>
                    Open the App
                </button>
            </div>
        </div>
    );
};

export default Artwork;
