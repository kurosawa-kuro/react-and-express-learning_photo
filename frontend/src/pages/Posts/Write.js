// Path: frontend/src/pages/Write.js

import React, { useState } from 'react';
import { useCreatePost } from '../../hooks/Posts/useCreatePost';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const Write = () => {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useUserAuthentication();
    const { handleSubmit, ...createPost } = useCreatePost(setTitle, setImages, setComment, setError, title, images, comment);

    return (
        <div>
            <h1>Write</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createPost.isLoading}>Submit</button>
            </form>
            {createPost.isSuccess && <div>Post successfully created!</div>}
        </div>
    );
};

export default Write;
