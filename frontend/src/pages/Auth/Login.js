import React from 'react';
import { useLoginUser } from '../../hooks/Auth/useLoginUser';
import '../../styles/App.css';

const Login = () => {
    const { email, password, error, setEmail, setPassword, handleSubmit, isLoading } = useLoginUser();

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={isLoading}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
