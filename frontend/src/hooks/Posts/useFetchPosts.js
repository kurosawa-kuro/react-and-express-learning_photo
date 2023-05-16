// src/hooks/useFetchPosts.js
import { useQuery } from '@tanstack/react-query';
import usePagination from '../usePagination';
import { fetchPosts } from '../../services/api';

export const useFetchPosts = (isAuthenticated, search) => {
    const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const { data, isLoading, isError } = useQuery(['posts', currentPage, search], () => fetchPosts(currentPage, search), {
        enabled: isAuthenticated,
        onSuccess: (data) => {
            setTotalPages(data.totalPages);
        },
    });

    return { data, isLoading, isError, currentPage, setCurrentPage, totalPages, handlePrevious, handleNext };
};
