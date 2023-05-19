// frontend\src\hooks\Posts\useFetchPostsByTag.js
import { useQuery } from '@tanstack/react-query';
import usePagination from '../usePagination';
import { fetchPostsByTag } from '../../services/api';

export const useFetchPostsByTag = (tagId) => {
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

    const { data, isLoading, isError } = useQuery(['posts', tagId, currentPage], () => fetchPostsByTag(tagId, currentPage), {
        onSuccess: (data) => {
            setTotalPages(data.totalPages);
        },
    });

    return { data, isLoading, isError, currentPage, setCurrentPage, totalPages, handlePrevious, handleNext };
};
