import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchSinglePost } from '../../hooks/Posts/useFetchSinglePost';
import { useUpdatePost } from '../../hooks/Posts/useUpdatePost';
import useUserAuthentication from '../../hooks/Auth/useUserAuthentication';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const DraggableImage = ({ id, imagePath, moveImage }) => {
    const [, drag] = useDrag({
        type: "image",
        item: { id },
    });

    const [, drop] = useDrop({
        accept: "image",
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.id;
            const hoverIndex = id;
            if (dragIndex === hoverIndex) {
                return
            }
            moveImage(dragIndex, hoverIndex);
            item.id = hoverIndex;
        },
    });

    const ref = useRef();
    drag(drop(ref));

    return (
        <div ref={ref}>
            <img src={"http://localhost:8080/uploads/" + imagePath} alt="post" />
        </div>
    );
};

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const { data: post } = useFetchSinglePost(id);
    console.log({ post });
    useUserAuthentication();
    const { handleSubmit, ...updatePost } = useUpdatePost(id, setTitle, setImages, setComment, setError, title, images, comment);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setComment(post.comment);
            const sortedImages = [...post.images].sort((a, b) => a.displayOrder - b.displayOrder);
            setImages(sortedImages);
        }
    }, [post]);

    const moveImage = (dragIndex, hoverIndex) => {
        const dragImage = images[dragIndex];
        const updatedImages = update(images, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragImage],
            ],
        });
        updatedImages.forEach((image, index) => {
            image.displayOrder = index + 1; // Add 1 so displayOrder starts at 1 instead of 0
        });
        setImages(updatedImages);
    };


    return (
        <div>
            <h1>Edit</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                {/* <input type="file" multiple onChange={(e) => setImages([...images, ...e.target.files])} required /> */}
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
