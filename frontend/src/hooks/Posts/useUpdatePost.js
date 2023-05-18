// src/hooks/useUpdatePost.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useUpdatePost = (id, setTitle, setImages, setComment, setError, title, images, comment) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        console.log({ images });
        images.forEach((image, index) => {
            formData.append(`images[${index}][id]`, image.id);
            formData.append(`images[${index}][image]`, image.imagePath);
            formData.append(`images[${index}][displayOrder]`, image.displayOrder);
        });
        formData.append('comment', comment);
        formData.append('userId', 1);  // Adjust this based on your authentication system

        mutation.mutate(formData);
    };

    const mutation = useMutation((formData) => updatePost(id, formData), {
        onSuccess: () => {
            setTitle('');
            setImages([]);
            setComment('');
            setError('');
            queryClient.invalidateQueries(['post', id]);
            queryClient.invalidateQueries(['posts']);
            navigate('/');  // Redirect to home page after successful post update
        },
        onError: (error) => {
            setError(error.response.data.error);
        }
    });

    return { handleSubmit, ...mutation };
};
