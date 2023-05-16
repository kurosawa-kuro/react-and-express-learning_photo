// src/hooks/useSearch.js
import useStore from '../state/store';

export const useSearch = () => {
    const search = useStore(state => state.search);
    const setSearch = useStore(state => state.setSearch);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    return { search, handleSearchChange };
};
