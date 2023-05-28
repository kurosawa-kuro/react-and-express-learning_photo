import React from 'react';
import { useLoginUser } from '../../hooks/Auth/useLoginUser';

export const Login = () => {
    const { email, password, error, setEmail, setPassword, handleSubmit, isLoading } = useLoginUser();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-2xl font-bold mb-8">Login</h1>
            <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                {error && <div className="bg-red-500 text-white font-bold py-2 px-4 rounded">{error}</div>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
