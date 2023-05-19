import { getApiClient } from './apiClient';

export const registerUser = async ({ name, password, email }) => {
    console.log('registerUser: name, password, email: ', name, password, email)
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
    console.log("fetchPosts")
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
    console.log('fetchTags');
    const apiClient = getApiClient();
    const { data } = await apiClient.get("/tags");
    console.log('fetchTags: data: ', data);
    return data;
};