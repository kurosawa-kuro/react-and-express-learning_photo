// frontend\src\hooks\Posts\useCreatePost.js

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = () => {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append('comment', comment);
        selectedTags.forEach((tagId) => {
            formData.append('tags', tagId);
        });

        // userIdはログインシステムに基づいて変更してください
        formData.append('userId', 1);

        mutation.mutate(formData);
    };

    const mutation = useMutation(createPost, {
        onSuccess: () => {
            // Clear form data
            setTitle('');
            setImages([]);
            setComment('');
            setError('');
            queryClient.invalidateQueries(['posts']);
            navigate('/');  // 投稿成功時にホームページへ遷移
        },
        onError: (error) => {
            // サーバーからのエラーメッセージを取り出して設定
            setError(error.response.data.error);
        }
    });

    return { title, setTitle, images, setImages, comment, setComment, selectedTags, setSelectedTags, error, handleSubmit, ...mutation };
};
