// src/pages/Home.js
import React from 'react';
import { useFetchPosts } from '../../hooks/Posts/useFetchPosts';
import { useSearch } from '../../hooks/useSearch';
import useFlashMessage from '../../hooks/useFlashMessage';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const Home = () => {
    const isAuthenticated = useUserAuthentication();
    const { search, handleSearchChange } = useSearch();
    const { data, isLoading, isError, handlePrevious, handleNext, currentPage, totalPages } =
        useFetchPosts(isAuthenticated, search);
    const flashMessage = useFlashMessage();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." />
            {data && data.data.map((post) => (
                <div className='post' key={post.id}>
                    <h2>{post.title}</h2>
                    <div className='post-info'>
                        <img src={"http://localhost:8080/uploads/" + post.image} alt={post.title} />
                        <p>{post.comment}</p>
                    </div>
                </div>
            ))}
            <div className="page-info">
                {currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
                {currentPage < totalPages && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default Home;
