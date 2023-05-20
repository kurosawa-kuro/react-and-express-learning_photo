// frontend\src\components\NavBar.js

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from '../state/store';
import { useLogout } from '../hooks/Auth/useLogout';

export const NavBar = () => {
    const { user, setUser } = useUserStore();
    const logout = useLogout();

    useEffect(() => {
        // Get the user from localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [setUser]);

    return (
        <nav>
            <ul>
                <li>
                    <Link className="button-link" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="button-link" to="/post/new">
                        New Post
                    </Link>
                </li>
                <li>
                    <Link className="button-link" to="/tag/new">
                        New Tag
                    </Link>
                </li>

                {!user && (
                    <>
                        <li>
                            <Link className="button-link" to="/register">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link className="button-link" to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        <Link className="button-link" to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                )}
                <li>
                    <Link className="button-link" to="/information">
                        Information
                    </Link>
                </li>

                <li>
                    <Link className={`button-link ${!user ? "inactive" : ""}`} to="">
                        {user ? user.name : 'Not Logged in'}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
