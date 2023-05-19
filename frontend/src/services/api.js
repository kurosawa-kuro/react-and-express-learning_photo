// path frontend\src\services\api.js

import { getApiClient } from './apiClient';

export const registerUser = async ({ name, password, email }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/register", { name, password, email });
    return data;
};

export const loginUser = async ({ email, password }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/login", { email, password });
    return data;
};

export const createPost = async (formData) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/posts", formData);
    return data;
};

export const fetchPosts = async (page = 1, search = '') => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get(`/posts?page=${page}&search=${search}`);
    return data;
};

export const fetchSinglePost = async (id) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get(`/posts/${id}`);
    return data;
};

export const updatePost = async (id, formData) => {
    console.log("updatePost")
    const apiClient = getApiClient();
    const { data } = await apiClient.put(`/posts/${id}`, formData);
    return data;
};

export const createTag = async ({ name }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.post("/tags", { name });
    return data;
};

export const fetchTags = async () => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get("/tags");
    return data;
};

export const deleteTag = async (id) => {
    const apiClient = getApiClient();
    const response = await apiClient.delete(`/tags/${id}`);
    return response.data;
};

export const updateTag = async ({ id, name }) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.put(`/tags/${id}`, { name });
    return data;
};

export const fetchPostsByTag = async (tagId, page = 1) => {
    const apiClient = getApiClient();
    const { data } = await apiClient.get(`/tags/${tagId}?page=${page}`);
    console.log("fetchPostsByTag: data: ", data)
    return data;
};
