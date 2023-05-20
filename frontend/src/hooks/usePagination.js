// frontend\src\hooks\usePagination.js

import { usePagingStore } from '../state/store'

export const usePagination = () => {
    const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagingStore()

    return { currentPage, setCurrentPage, totalPages, setTotalPages };
};
