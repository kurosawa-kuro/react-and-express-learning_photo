// frontend\src\pages\Posts\Show.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';

const Show = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useFetchSinglePost(id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching the post.</div>;

    return (
        <div>
            <h1>Show</h1>
            <h2>{data.title}</h2>
            <div className='single-photo-info'>
                <div>
                    {data.images && data.images.map((image, index) => (
                        <img key={index} src={"http://localhost:8080/uploads/" + image.imagePath} alt={`Post ${data.title} ${index}`} />
                    ))}
                </div>
                <p>{data.comment}</p>
            </div>
        </div>
    );
};

export default Show;
