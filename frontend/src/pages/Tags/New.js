// src/pages/Tags/New.js

import React, { useState } from 'react';
import { useCreateTag } from '../../hooks/Tags/useCreateTag.js';

const TagNew = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { handleSubmit, ...createTag } = useCreateTag(setName, setError, name);

    return (
        <div>
            <h1>Create New Tag</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={createTag.isLoading}>Submit</button>
            </form>
            {createTag.isSuccess && <div>Tag successfully created!</div>}
        </div>
    );
};

export default TagNew;
