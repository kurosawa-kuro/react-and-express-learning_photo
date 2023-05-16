// src/hooks/useCreatePost.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = (setTitle, setImage, setComment, setError, title, image, comment) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('comment', comment);

        // userIdはログインシステムに基づいて変更してください
        formData.append('userId', 1);

        mutation.mutate(formData);
    };

    const mutation = useMutation(createPost, {
        onSuccess: () => {
            // Clear form data
            setTitle('');
            setImage(null);
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

    return { handleSubmit, ...mutation };
};
