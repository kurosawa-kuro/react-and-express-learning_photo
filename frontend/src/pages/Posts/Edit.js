// frontend\src\pages\Posts\Edit.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import { useEditStore } from '../../state/store';
import { useAuthFromLocalStorage } from '../../hooks/Auth/useAuthFromLocalStorage';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useFetchTags } from '../../hooks/Posts/useFetchTags';
import { useUpdatePost } from '../../hooks/Posts/useUpdatePost';
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

export const Edit = () => {
    useAuthFromLocalStorage();

    const { id } = useParams();
    const { title, setTitle, images, setImages, comment, setComment, error, setError, selectedTags, setSelectedTags } = useEditStore();
    const { data: post } = useFetchSinglePost(id);
    const { data: tags } = useFetchTags();

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

    usePostUpdateEffect(post, setTitle, setImages, setComment, setSelectedTags);

    const { handleSubmit, ...updatePost } = useUpdatePost(id, setTitle, setImages, setComment, setError, title, images, comment, selectedTags);

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

                {tags && (
                    <select multiple value={selectedTags} onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}>
                        {tags.data.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                )}
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={updatePost.isLoading}>Submit</button>
            </form>
            {updatePost.isSuccess && <div>Post successfully updated!</div>}
        </div>
    );
};

