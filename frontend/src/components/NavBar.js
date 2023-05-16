import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from '../state/store';

const NavBar = () => {
    const navigate = useNavigate();
    const setUser = useStore(state => state.setUser);
    const user = useStore(state => state.user);

    const logout = (event) => {
        event.preventDefault();

        // Remove the token and user from localStorage
        localStorage.removeItem('user');
        setUser(null);

        // Redirect the user to the login page
        navigate('/login');
    };

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
                    <Link className="button-link" to="/write">
                        Write
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

export default NavBar;
