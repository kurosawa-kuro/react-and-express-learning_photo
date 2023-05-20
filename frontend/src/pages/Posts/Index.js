// path frontend\src\pages\Posts\Index.js

// React and related packages
import React from 'react';
import { Link } from 'react-router-dom';

// Hooks
import { useFetchPosts } from '../../hooks/Posts/useFetchPosts';
import { useSearch } from '../../hooks/useSearch';
import useFlashMessage from '../../hooks/useFlashMessage';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';

const Home = () => {
    const isAuthenticated = useUserAuthentication();
    const flashMessage = useFlashMessage();
    const { search, handleSearchChange } = useSearch();
    const { data, isLoading, isError, handlePrevious, handleNext, currentPage, totalPages } =
        useFetchPosts(isAuthenticated, search);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching posts.</div>;

    return (
        <div>
            <h1>Posts</h1>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." />
            {data && data.data.map((post) => (
                <div className='post-card' key={post.id}>
                    <h2 className='post-title'>
                        {post.title}
                        <div className='post-actions'>
                            <Link to={`/post/${post.id}`}><h3>Show</h3></Link> {/* Singleへのリンクを追加 */}
                            <Link to={`/post/${post.id}/edit`}><h3>Edit</h3></Link> {/* Editへのリンクを追加 */}
                            <Link to={`/post/${post.id}/edit`}><h3>Delete</h3></Link> {/* Editへのリンクを追加 */}
                        </div>
                    </h2>
                    <div className='post-content'>
                        {post.images && post.images.length > 0 && (
                            <img src={"http://localhost:8080/uploads/" + post.images[0].imagePath} alt={post.title} />
                        )}
                        <div className='post-description'>
                            <p>{post.comment}</p>
                            <p>{new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' }).format(new Date(post.updatedAt))}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="pagination-controls">
                {currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
                {currentPage < totalPages && <button onClick={handleNext}>Next</button>}
            </div>
        </div>
    );
};

export default Home;
