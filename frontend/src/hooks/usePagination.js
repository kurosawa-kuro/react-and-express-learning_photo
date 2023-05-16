// src/hooks/usePagination.js

import useStore from '../state/store';

const usePagination = () => {
    const currentPage = useStore(state => state.currentPage);
    const setCurrentPage = useStore(state => state.setCurrentPage);
    const totalPages = useStore(state => state.totalPages);
    const setTotalPages = useStore(state => state.setTotalPages);

    return { currentPage, setCurrentPage, totalPages, setTotalPages };
};

export default usePagination;
