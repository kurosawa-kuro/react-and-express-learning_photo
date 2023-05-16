// src/hooks/useUserAuthentication.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    return isAuthenticated;
};

export default useUserAuthentication;
