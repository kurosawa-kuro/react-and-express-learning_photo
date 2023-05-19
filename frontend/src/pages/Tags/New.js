// src/pages/Tags/New.js

import React, { useState } from 'react';
import { useCreateTag } from '../../hooks/Tags/useCreateTag.js';
import { useFetchTags } from '../../hooks/Tags/useFetchTags.js';
import { useDeleteTag } from '../../hooks/Tags/useDeleteTag.js'; // Add this line

const TagNew = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { handleSubmit, ...createTag } = useCreateTag(setName, setError, name);
    const { data: tagList, isLoading: tagsLoading, isError: tagsError } = useFetchTags();
    const deleteTag = useDeleteTag(); // Add this line

    return (
        <div>
            <h1>Create New Tag</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createTag.isLoading}>Submit</button>
            </form>
            {createTag.isSuccess && <div>Tag successfully created!</div>}

            <h2>Existing Tags</h2>
            {tagsLoading && <div>Loading...</div>}
            {tagsError && <div>Error loading tags</div>}
            {tagList && (
                <ul>
                    {tagList.data.map(tag => (
                        <li key={tag.id}>
                            {tag.name}
                            <button onClick={() => deleteTag.mutate(tag.id)}>Delete</button>  {/* Add this line */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagNew;
