// Path: frontend\src\state\store.js

import create from 'zustand'

const useStore = create(set => ({
    // Check if user data exists in localStorage and use it, otherwise set to null
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    flashMessage: '',
    setFlashMessage: (message) => set({ flashMessage: message }),
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    totalPages: 1,
    setTotalPages: (pages) => set({ totalPages: pages }),
    search: '',
    setSearch: (search) => set({ search }),
    // Adding new state properties for Edit component
    title: '',
    setTitle: (title) => set({ title }),
    images: [],
    setImages: (images) => set({ images }),
    comment: '',
    setComment: (comment) => set({ comment }),
    error: '',
    setError: (error) => set({ error }),
    name: '',
    setName: (name) => set({ name }),
    editName: '',
    setEditName: (editName) => set({ editName }),
    editTagId: null,
    setEditTagId: (editTagId) => set({ editTagId }),
}))

export default useStore
