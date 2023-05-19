// src/hooks/useCreateTag.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTag } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useCreateTag = (setName, setError, name) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagData = { name };
        mutation.mutate(tagData);
    };

    const mutation = useMutation(createTag, {
        onSuccess: () => {
            // Clear form data
            setName('');
            setError('');
            queryClient.invalidateQueries(['tags']);
            navigate('/tag/new');  // Successfully created a new tag, navigate to tags page
        },
        onError: (error) => {
            // Set error message from the server
            setError(error.response.data.error);
        }
    });

    return { handleSubmit, ...mutation };
};
