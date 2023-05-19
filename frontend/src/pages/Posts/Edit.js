// path frontend\src\pages\Posts\Edit.js

import React from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../state/store';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useUpdatePost } from '../../hooks/Posts/useUpdatePost';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { useImageDragAndDrop } from '../../hooks/Posts/useImageDragAndDrop';
import { usePostUpdateEffect } from '../../hooks/Posts/usePostUpdateEffect';

const DraggableImage = ({ id, imagePath, moveImage }) => {
    const { ref } = useImageDragAndDrop(id, moveImage);

    return (
        <div ref={ref}>
            <img src={"http://localhost:8080/uploads/" + imagePath} alt="post" />
        </div>
    );
};

const Edit = () => {
    useUserAuthentication();
    const { id } = useParams();
    const {
        title,
        setTitle,
        images,
        setImages,
        comment,
        setComment,
        error,
        setError,
    } = useStore(state => ({
        title: state.title,
        setTitle: state.setTitle,
        images: state.images,
        setImages: state.setImages,
        comment: state.comment,
        setComment: state.setComment,
        error: state.error,
        setError: state.setError,
    }));

    const { data: post } = useFetchSinglePost(id);
    const { handleSubmit, ...updatePost } = useUpdatePost(id, setTitle, setImages, setComment, setError, title, images, comment);

    usePostUpdateEffect(post, setTitle, setImages, setComment);

    const moveImage = (dragIndex, hoverIndex) => {
        const dragImage = images[dragIndex];
        const updatedImages = update(images, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragImage],
            ],
        });
        updatedImages.forEach((image, index) => {
            image.displayOrder = index + 1;
        });
        setImages(updatedImages);
    };

    return (
        <div>
            <h1>Edit</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <div className='edit-images-list'>
                    <DndProvider backend={HTML5Backend}>
                        {images && images.map((image, index) => (
                            <DraggableImage key={index} id={index} imagePath={image.imagePath} moveImage={moveImage} />
                        ))}
                    </DndProvider>
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" required />
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={updatePost.isLoading}>Submit</button>
            </form>
            {updatePost.isSuccess && <div>Post successfully updated!</div>}
        </div>
    );
};

export default Edit;
