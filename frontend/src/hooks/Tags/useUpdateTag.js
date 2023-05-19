// src/hooks/Tags/useUpdateTag.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTag as updateTagAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useUpdateTag = (setEditTagId, setEditName, setError, id, name) => { // Add setEditTagId
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(() => updateTagAPI({ id, name }), {
        onSuccess: () => {
            setEditTagId(null); // Add this line
            setEditName('');
            setError('');
            queryClient.invalidateQueries(['tags']);
            navigate('/tag/new');
        },
        onError: (error) => {
            setError(error.response.data.error);
        }
    });

    return mutation;
};
