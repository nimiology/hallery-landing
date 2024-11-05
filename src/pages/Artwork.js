import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './Profile.css';
import './Home.css';
import { useParams } from "react-router-dom"; // For getting the artworkId from URL

const Artwork = () => {
    const { artworkId } = useParams(); // Extracting artworkId from URL
    const [artworkData, setArtworkData] = useState(null);
    const [error, setError] = useState(null); // State for error handling

    // Fetch artwork data when component mounts
    useEffect(() => {
        const fetchArtworkData = async () => {
            try {
                const response = await fetch(`https://api.hallery.art/art/artwork/${artworkId}/`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`); // Throw an error if response is not OK
                }

                const data = await response.json();
                setArtworkData(data);
            } catch (error) {
                console.error("Error fetching artwork data:", error);
                setError(true); // Set error state to true
            }
        };

        fetchArtworkData();
    }, [artworkId]);

    // Handler for opening the app
    const handleOpenApp = () => {
        window.open(`hallery://artwork/${artworkId}`); // Link to open the app
    };

    if (error) {
        return (
            <div className="main-content" style={{ justifyContent: 'center' }}>
                <Helmet>
                    <title>Artwork Not Found - Hallery</title>
                    <meta name="description" content="404 - The artwork you are looking for does not exist." />
                </Helmet>
                <div className="profile-container">
                    <h1 className="username">404 - Artwork Not Found</h1>
                </div>
            </div>
        ); // Show 404 message if there is an error
    }

    if (!artworkData) {
        return (
            <div className="main-content" style={{ justifyContent: 'center' }}>
                <Helmet>
                    <title>Loading Artwork - Hallery</title>
                    <meta name="description" content="Loading artwork data. Please wait." />
                </Helmet>
                <div className="profile-container">
                    <h1 className="username">Loading...</h1>
                </div>
            </div>
        ); // Loading state while data is being fetched
    }

    // Destructure the necessary data
    const { owner, title, thumbnail } = artworkData;
    const { profile_img, username, name } = owner; // Extract owner data

    return (
        <div className="main-content" style={{ justifyContent: 'center' }}>
            <Helmet>
                <title>{`${title} - Artwork on Hallery`}</title>
                <meta name="description" content={`Explore the artwork titled "${title}" by ${name} on Hallery.`} />
                <meta property="og:title" content={`${title} - Artwork by ${name}`} />
                <meta property="og:description" content={`Discover "${title}" created by ${name}. View details and connect on Hallery.`} />
                <meta property="og:image" content={thumbnail} />
                <meta property="og:url" content={`https://hallery.art/artwork/${artworkId}`} />
            </Helmet>
            <div className="profile-container">
                {thumbnail && (
                    <img src={thumbnail} alt="Artwork" className="artwork-thumbnail" />
                )}
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
