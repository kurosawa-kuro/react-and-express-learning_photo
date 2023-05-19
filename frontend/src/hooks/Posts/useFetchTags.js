// frontend\src\hooks\Posts\useFetchTags.js

import { useQuery } from '@tanstack/react-query';
import { fetchTags } from '../../services/api';

export const useFetchTags = () => {
    return useQuery(['tags'], fetchTags);
};
