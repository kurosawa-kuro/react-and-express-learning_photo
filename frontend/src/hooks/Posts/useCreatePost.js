import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useCreatePost = () => {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        // console.log({ images });
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append('comment', comment);
        formData.append('userId', 1);  // userIdはログインシステムに基づいて変更してください

        mutation.mutate(formData);
    };

    const mutation = useMutation(createPost, {
        onSuccess: () => {
            setTitle('');
            setImages([]);
            setComment('');
            setError('');
            queryClient.invalidateQueries(['posts']);
            navigate('/');  // 投稿成功時にホームページへ遷移
        },
        onError: (error) => {
            setError(error.response.data.error);
        }
    });

    return { title, images, comment, error, setTitle, setImages, setComment, handleSubmit, ...mutation };
};
