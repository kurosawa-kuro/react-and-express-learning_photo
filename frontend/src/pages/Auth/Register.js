// Path: frontend/src/pages/Register.js

import React, { useState } from 'react';
import { useRegisterUser } from '../../hooks/Auth/useRegisterUser';
import '../../styles/App.css';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { handleSubmit, isLoading, isSuccess } = useRegisterUser(setName, setEmail, setPassword, setError);

    return (
        <div className="container">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit(name, email, password)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            {isSuccess && <div>User successfully registered!</div>}
        </div>
    );
};

export default Registration;
