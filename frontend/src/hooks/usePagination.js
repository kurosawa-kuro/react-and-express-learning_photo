// frontend\src\hooks\usePagination.js

import { usePagingStore } from '../state/store'

const usePagination = () => {
    const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagingStore()


    return { currentPage, setCurrentPage, totalPages, setTotalPages };
};

export default usePagination;
