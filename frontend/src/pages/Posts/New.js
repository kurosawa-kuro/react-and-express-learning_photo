// frontend\src\pages\Posts\New.js

import React from 'react';
import { useCreatePost } from '../../hooks/Posts/useCreatePost';
import { useFetchTags } from '../../hooks/Posts/useFetchTags';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const New = () => {
    useUserAuthentication();
    const { title, setTitle, images, setImages, comment, setComment, selectedTags, setSelectedTags, error, handleSubmit, ...createPost } =
        useCreatePost();
    const { data: tags } = useFetchTags();

    return (
        <div>
            <h1>Write</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" />

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

