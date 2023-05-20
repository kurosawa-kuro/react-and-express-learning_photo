// frontend\src\hooks\Tags\useUpdateTag.js
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTag as updateTagAPI } from '../../services/api';

export const useUpdateTag = (setEditTagId, setEditName, setError, id, name) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(() => updateTagAPI({ id, name }), {
        onSuccess: () => {
            setEditTagId(null);
            setEditName('');
            setError('');
            queryClient.invalidateQueries(['tags']);
            navigate('/tag/new');
        },
        onError: (error) => {
            setError(error.response.data.error);
        }
    });

    const handleEdit = (tag) => {
        setEditTagId(tag.id);
        setEditName(tag.name);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        mutation.mutate();
    };

    return { handleEdit, handleUpdate };
};


