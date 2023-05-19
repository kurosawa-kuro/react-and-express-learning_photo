// frontend\src\hooks\Auth\useRegisterUser.js

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useUserStore, useFlashMessageStore } from '../../state/store'

export const useRegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUserStore()
    const { setFlashMessage } = useFlashMessageStore()
    const navigate = useNavigate();

    const mutation = useMutation(registerUser, {
        onSuccess: (data) => {
            if (data.user && data.user.name) {
                setUser({ name: data.user.name, email: data.user.email });
                localStorage.setItem('user', JSON.stringify({ name: data.user.name, email: data.user.email }));
            }
            setName('');
            setEmail('');
            setPassword('');
            setError('');
            setFlashMessage('Logged in successfully!');
            localStorage.setItem('token', data.token);
            navigate('/');
        },
        onError: (error) => {
            setError(error.response ? error.response.data.error : 'Registration failed');
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill out all fields');
            return;
        }
        mutation.mutate({ name, email, password });
    };

    return { setName, setEmail, setPassword, handleSubmit, error, isLoading: mutation.isLoading, isSuccess: mutation.isSuccess };
};
