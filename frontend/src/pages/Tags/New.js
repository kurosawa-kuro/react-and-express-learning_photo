// src/pages/Tags/New.js

import React from 'react';
import { useCreateTag } from '../../hooks/Tags/useCreateTag.js';
import { useFetchTags } from '../../hooks/Tags/useFetchTags.js';
import { useDeleteTag } from '../../hooks/Tags/useDeleteTag.js';
import { useUpdateTag } from '../../hooks/Tags/useUpdateTag.js';
import { useEditStore } from '../../state/store.js'; // import the store
import { Link } from 'react-router-dom';

const TagNew = () => {
    const { name, setName, editName, setEditName, setEditTagId, editTagId, error, setError } = useEditStore()

    const { handleSubmit, ...createTag } = useCreateTag(setName, setError, name);
    const { data: tagList, isLoading: tagsLoading, isError: tagsError } = useFetchTags();
    const deleteTag = useDeleteTag();
    const updateTag = useUpdateTag(setEditTagId, setEditName, setError, editTagId, editName);

    const handleEdit = (tag) => {
        setEditTagId(tag.id);
        setEditName(tag.name);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateTag.mutate();
    };

    return (
        <div>
            <h1>Create New Tag</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createTag.isLoading}>Submit</button>
            </form>
            {/* {createTag.isSuccess && <div>Tag successfully created!</div>} */}

            <h2>Existing Tags</h2>
            {tagsLoading && <div>Loading...</div>}
            {tagsError && <div>Error loading tags</div>}
            {tagList && (
                <ul>
                    {tagList.data.map(tag => (
                        <li key={tag.id}>
                            <div className='tag-item'>
                                {tag.id === editTagId ? (
                                    <form onSubmit={handleUpdate}>
                                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                                        <div className='tag-item'>
                                            <button type="submit">Update</button>
                                            <button onClick={() => setEditTagId(null)}>Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        {/* ここでLinkを使ってリンクを作成 */}
                                        <Link to={`/tag/${tag.id}`}>{tag.name}</Link>
                                        <button onClick={() => handleEdit(tag)}>Edit</button>
                                        <button onClick={() => deleteTag.mutate(tag.id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagNew;
