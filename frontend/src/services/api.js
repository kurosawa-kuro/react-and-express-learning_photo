// frontend\src\services\api.js

import { getApiClient } from './apiClient';

const callApi = async (method, url, data) => {
    const apiClient = getApiClient();
    const response = await apiClient[method](url, data);
    return response.data;
};

export const registerUser = async (data) => {
    return await callApi("post", "/register", data);
};

export const loginUser = async (data) => {
    return await callApi("post", "/login", data);
};

export const createPost = async (formData) => {
    return await callApi("post", "/posts", formData);
};

export const fetchPosts = async (page = 1, search = '') => {
    return await callApi("get", `/posts?page=${page}&search=${search}`);
};

export const fetchSinglePost = async (id) => {
    return await callApi("get", `/posts/${id}`);
};

export const updatePost = async (id, formData) => {
    return await callApi("put", `/posts/${id}`, formData);
};

export const createTag = async (data) => {
    return await callApi("post", "/tags", data);
};

export const fetchTags = async () => {
    return await callApi("get", "/tags");
};

export const deleteTag = async (id) => {
    return await callApi("delete", `/tags/${id}`);
};

export const updateTag = async (data) => {
    return await callApi("put", `/tags/${data.id}`, data);
};

export const fetchPostsByTag = async (tagId, page = 1) => {
    return await callApi("get", `/tags/${tagId}?page=${page}`);
};
