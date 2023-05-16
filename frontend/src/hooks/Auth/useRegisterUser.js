// src/hooks/useRegisterUser.js
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import useStore from '../../state/store'

export const useRegisterUser = (setName, setEmail, setPassword, setError) => {
    const setUser = useStore(state => state.setUser)
    const setFlashMessage = useStore((state) => state.setFlashMessage);
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

    const handleSubmit = (name, email, password) => (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill out all fields');
            return;
        }
        mutation.mutate({ name, email, password });
    };

    return { handleSubmit, ...mutation };
};
