// path frontend\src\hooks\Posts\usePostUpdateEffect.js

import { useEffect } from 'react';

export const usePostUpdateEffect = (post, setTitle, setImages, setComment, setSelectedTags) => {
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setComment(post.comment);
            const sortedImages = [...post.images].sort((a, b) => a.displayOrder - b.displayOrder);
            setImages(sortedImages);
            setSelectedTags(post.tags.map(tag => tag.tagId));
        }
    }, [post, setTitle, setImages, setComment, setSelectedTags]);
};