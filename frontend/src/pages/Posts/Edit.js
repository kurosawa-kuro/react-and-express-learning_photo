// src/pages/Posts/Edit.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useUpdatePost } from '../../hooks/Posts/useUpdatePost';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const { data: post } = useFetchSinglePost(id);
    console.log({ post });
    useUserAuthentication();
    const { handleSubmit, ...updatePost } = useUpdatePost(id, setTitle, setImages, setComment, setError, title, images, comment);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setComment(post.comment);
            setImages(post.images);
        }
    }, [post]);

    return (
        <div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={updatePost.isLoading}>Submit</button>
            </form>
            {updatePost.isSuccess && <div>Post successfully updated!</div>}
        </div>
    );
};

export default Edit;
