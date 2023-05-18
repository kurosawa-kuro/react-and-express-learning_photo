// src/hooks/useFetchSinglePost.js

import { useQuery } from '@tanstack/react-query';
import { fetchSinglePost } from '../../services/api';

export const useFetchSinglePost = (id) => {
    const { data, isLoading, isError } = useQuery(['post', id], () => fetchSinglePost(id));

    return { data, isLoading, isError };
};
