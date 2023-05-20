// frontend\src\pages\Auth\Register.js

import React from 'react';
import { useRegisterUser } from '../../hooks/Auth/useRegisterUser';
import '../../styles/App.css';

export const Registration = () => {
    const { setName, setEmail, setPassword, handleSubmit, error, isLoading, isSuccess } = useRegisterUser();
    console.log('Registration.js: error', error);
    console.log('Registration.js: error.name', error.name);
    return (
        <div className="container">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && (
                    <div className="error">
                        {error.issues.map((issue, index) => (
                            <p key={index}>{issue.message}</p>
                        ))}
                    </div>
                )}
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            {isSuccess && <div>User successfully registered!</div>}
        </div>
    );
};
