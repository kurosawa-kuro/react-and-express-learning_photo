// frontend\src\hooks\Auth\useLogout.js

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../state/store';

export const useLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore()

    const logout = (event) => {
        event.preventDefault();

        // Remove the token and user from localStorage
        localStorage.removeItem('user');
        setUser(null);

        // Redirect the user to the login page
        navigate('/login');
    };

    return logout;
};
