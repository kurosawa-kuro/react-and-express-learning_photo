// frontend\src\hooks\Auth\useLoginUser.js

import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useFlashMessageStore } from '../../state/store'
import { useState } from 'react';

export const useLoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUserStore()
    const { setFlashMessage } = useFlashMessageStore()
    const navigate = useNavigate();

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data.user && data.user.name) {
                setUser({ name: data.user.name });
                localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: data.user.email }));
            }
            setEmail('');
            setPassword('');
            setError('');
            setFlashMessage('Logged in successfully!');
            navigate('/');
        },
        onError: (error) => {
            setError(error.response ? error.response.data.error : 'Login failed');
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill out all fields');
        } else {
            mutation.mutate({ email, password });
        }
    };

    return { email, password, error, setEmail, setPassword, handleSubmit, ...mutation };
};
