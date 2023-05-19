// src/hooks/Tags/useFetchTags.js

import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../services/api';

export const useFetchTags = () => {
    const { data, isLoading, isError } = useQuery(['tags'], fetchTags);
    return { data, isLoading, isError };
};