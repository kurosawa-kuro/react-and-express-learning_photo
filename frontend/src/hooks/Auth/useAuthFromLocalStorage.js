// frontend\src\hooks\Auth\useUserAuthentication.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../state/store'

export const useAuthFromLocalStorage = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        } else {
            navigate('/login');
        }
    }, [navigate, setUser]);
};
