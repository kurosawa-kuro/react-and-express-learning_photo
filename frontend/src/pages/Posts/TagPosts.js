// frontend\src\pages\Posts\TagPosts.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchPostsByTag } from '../../hooks/Posts/useFetchPostsByTag';

const TagPosts = () => {
    const { tagId } = useParams();
    const { data, isLoading, isError, handlePrevious, handleNext, currentPage, totalPages } =
        useFetchPostsByTag(parseInt(tagId));

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Tag Posts</h1>
            <h2>Tag ID: {data.data.name}</h2>
            {data.data.posts && data.data.posts.map((postRelation) => {
                const post = postRelation.post;
                return (
                    <div className='post-card' key={post.id}>
                        <h2 className='post-title'>{post.title}</h2>
                        <div className='post-content'>
                            <p>{post.comment}</p>
                            <p>{post.updatedAt}</p>
                        </div>
                    </div>
                );
            })}
            <div className="pagination-controls">
                {currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
                {currentPage < totalPages && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default TagPosts;
