import React from 'react';
import './Home.css'; // Adjust the path if necessary

const Contact = () => {
    return (
        <div className="main-content" style={{justifyContent: 'center'}}>
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>For App Questions: <a href="mailto:support@hallery.art">support@hallery.art</a></p>
                <p>For General Inquiries: <a href="mailto:info@hallery.art">info@hallery.art</a></p>
                <p>For Privacy Concerns: <a href="mailto:privacy@hallery.art">privacy@hallery.art</a></p>
                <p>For Feedback: <a href="mailto:feedback@hallery.art">feedback@hallery.art</a></p>
            </div>
        </div>
    );
}

export default Contact;
