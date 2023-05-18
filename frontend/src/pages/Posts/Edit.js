// src/pages/Posts/Edit.js

import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useUpdatePost } from '../../hooks/Posts/useUpdatePost';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_IMAGES':
            return { ...state, images: action.payload };
        case 'SET_COMMENT':
            return { ...state, comment: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const Edit = () => {
    const { id } = useParams();
    const [formState, dispatch] = useReducer(formReducer, {
        title: '',
        images: [],
        comment: '',
        error: '',
    });

    const { data: post } = useFetchSinglePost(id);
    useUserAuthentication();
    const { handleSubmit, ...updatePost } = useUpdatePost(id, dispatch);

    useEffect(() => {
        if (post) {
            dispatch({ type: 'SET_TITLE', payload: post.title });
            dispatch({ type: 'SET_COMMENT', payload: post.comment });
            const sortedImages = [...post.images].sort((a, b) => a.displayOrder - b.displayOrder);
            dispatch({ type: 'SET_IMAGES', payload: sortedImages });
        }
    }, [post]);

    const handleChange = (type) => (event) => {
        dispatch({ type, payload: event.target.value });
    };

    return (
        <div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formState.title}
                    onChange={handleChange('SET_TITLE')}
                    placeholder="Title"
                    required
                />
                <input
                    type="file"
                    multiple
                    onChange={(e) => dispatch({ type: 'SET_IMAGES', payload: [...formState.images, ...e.target.files] })}
                    required
                />
                <div>
                    {post &&
                        post.images &&
                        post.images.map((image, index) => (
                            <img key={index} src={"http://localhost:8080/uploads/" + image.imagePath} alt={post.title} />
                        ))}
                </div>
                <textarea
                    value={formState.comment}
                    onChange={handleChange('SET_COMMENT')}
                    placeholder="Comment"
                    required
                />
                {formState.error && <div className="error">{formState.error}</div>}
                <button type="submit" disabled={updatePost.isLoading}>
                    Submit
                </button>
            </form>
            {updatePost.isSuccess && <div>Post successfully updated!</div>}
        </div>
    );
};

export default Edit;
