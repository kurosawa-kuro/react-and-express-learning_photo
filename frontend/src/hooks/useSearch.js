// frontend\src\hooks\useSearch.js

import { useSearchStore } from '../state/store';

export const useSearch = () => {
    const { search, setSearch } = useSearchStore()

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    return { search, handleSearchChange };
};
