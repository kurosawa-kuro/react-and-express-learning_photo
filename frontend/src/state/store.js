// Path: frontend\src\state\store.js

import create from 'zustand'

// User関連の状態
const useUserStore = create(set => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
}))

// Flash message関連の状態
const useFlashMessageStore = create(set => ({
    flashMessage: '',
    setFlashMessage: (message) => set({ flashMessage: message }),
}))

// ページング関連の状態
const usePagingStore = create(set => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    totalPages: 1,
    setTotalPages: (pages) => set({ totalPages: pages }),
}))

// 検索関連の状態
const useSearchStore = create(set => ({
    search: '',
    setSearch: (search) => set({ search }),
}))

// 編集コンポーネント関連の状態
const useEditStore = create(set => ({
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

export { useUserStore, useFlashMessageStore, usePagingStore, useSearchStore, useEditStore }
