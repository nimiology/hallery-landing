import React, {useState} from 'react';
import './ForgetPassword.css';
import {useParams, useNavigate} from "react-router-dom";

// Utility function for password validation
const validatePasswords = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
        return "Passwords do not match";
    }
    return "";
};

function ResetPassword() {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const {uid, token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Handle password input changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setError(validatePasswords(newPassword, confirmPassword));
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setError(validatePasswords(password, newConfirmPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setLoading(true); // Start loading
            try {
                const response = await fetch('https://api.hallery.art/auth/users/reset_password_confirm/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "uid": uid,
                        "token": token,
                        "new_password": password
                    }),
                });

                setLoading(false); // Stop loading after request is done

                if (response.status === 204) {
                    navigate('/success'); // Redirect to the success page
                } else {
                    setLoading(false); // Stop loading if an error occurs
                    const responseBody = await response.json(); // Parse the response as JSON
                    const formattedErrors = Object.entries(responseBody).map(([key, value]) => {
                        return `${key}: ${value[0]}`; // Get the first error message for the key
                    }).join('\n'); // Join all error messages into a single string
                    setError(formattedErrors); // Set the formatted error messages

                }
            } catch (error) {
                setLoading(false); // Stop loading if an error occurs
                console.error("Error:", error);
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="center-wrapper">
            <div className="reset-password-container">
                <header>
                    <h2>Create New Password</h2>
                    <p>Please enter your new password below for your Hallery account.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />

                    {error && <p className='p-error'>{error}</p>}

                    <button type="submit" style={{backgroundColor: loading ? 'gray' : '#3498db', color: 'white'}}
                            disabled={!!error || loading}>
                        {loading ? <div className='spinnerStyle'></div> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
