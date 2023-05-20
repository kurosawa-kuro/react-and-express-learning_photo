// frontend\src\hooks\Tags\useDeleteTag.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTag } from '../../services/api';

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deleteTag, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tags']);
        },
    });

    return mutation;
};
