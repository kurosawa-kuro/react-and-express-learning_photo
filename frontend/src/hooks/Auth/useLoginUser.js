// src/hooks/useLoginUser.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import useStore from '../../state/store'

export const useLoginUser = (setEmail, setPassword, setError) => {
    const setUser = useStore(state => state.setUser)
    const setFlashMessage = useStore((state) => state.setFlashMessage);
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

    const handleSubmit = (email, password) => (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill out all fields');
        } else {
            mutation.mutate({ email, password });
        }
    };

    return { handleSubmit, ...mutation };
};
