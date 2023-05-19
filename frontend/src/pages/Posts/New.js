// Path: frontend\src\pages\Posts\New.js

import React, { useState } from 'react';
import { useCreatePost } from '../../hooks/Posts/useCreatePost';
import { useFetchTags } from '../../hooks/Posts/useFetchTags';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const New = () => {
    useUserAuthentication();
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [error, setError] = useState('');

    const { handleSubmit, ...createPost } =
        useCreatePost(setTitle, setImages, setComment, setError, title, images, comment, selectedTags);

    const { data: tags } = useFetchTags();

    return (
        <div>
            <h1>Write</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />

                {tags && (
                    <select multiple onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}>
                        {tags.data.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                )}

                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createPost.isLoading}>Submit</button>
            </form>
            {createPost.isSuccess && <div>Post successfully created!</div>}
        </div>
    );
};

export default New;

