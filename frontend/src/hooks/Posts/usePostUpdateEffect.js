import { useEffect } from 'react';

export const usePostUpdateEffect = (post, setTitle, setImages, setComment) => {
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setComment(post.comment);
            const sortedImages = [...post.images].sort((a, b) => a.displayOrder - b.displayOrder);
            setImages(sortedImages);
        }
    }, [post, setTitle, setImages, setComment]);
};