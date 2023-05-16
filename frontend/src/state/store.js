// Path: frontend/src/store.js

import create from 'zustand'

const useStore = create(set => ({
    user: null,
    setUser: (user) => set({ user }),
    flashMessage: '',
    setFlashMessage: (message) => set({ flashMessage: message }),
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    totalPages: 1,
    setTotalPages: (pages) => set({ totalPages: pages }),
    search: '',
    setSearch: (search) => set({ search }),
}))

export default useStore
