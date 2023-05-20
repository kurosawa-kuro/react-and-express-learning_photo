// frontend\src\pages\Posts\Show.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useImageModal } from '../../hooks/Posts/useImageModal';

const Show = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useFetchSinglePost(id);
    const { selectedImage, openModal, closeModal } = useImageModal();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while fetching the post.</div>;

    return (
        <div>
            <h1>Show</h1>
            <h2>{data.title}</h2>
            <div className='single-photo-info'>
                <div className='photo-list'>
                    {data.images && data.images.map((image, index) => (
                        <img
                            key={index}
                            src={"http://localhost:8080/uploads/" + image.imagePath}
                            alt={`Post ${data.title} ${index}`}
                            onClick={() => openModal(image.imagePath)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>
                <p>{data.comment}</p>
            </div>

            {selectedImage && (
                <div style={{
                    position: 'fixed', top: '0', left: '0', width: '450px', height: '600px',
                    display: 'flex', alignItems: 'center'
                }}
                    onClick={closeModal}>
                    <img src={selectedImage} style={{ width: '200%', height: 'auto' }} alt="Selected" />
                </div>
            )}
        </div>
    );
};

export default Show;
