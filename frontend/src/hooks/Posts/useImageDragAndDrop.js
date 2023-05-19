// Path: frontend\src\hooks\Posts\useImageDragAndDrop.js

import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export const useImageDragAndDrop = (id, moveImage) => {
    const [, drag] = useDrag({
        type: "image",
        item: { id },
    });

    const [, drop] = useDrop({
        accept: "image",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.id;
            const hoverIndex = id;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.id = hoverIndex;
        },
    });

    const ref = useRef();
    drag(drop(ref));

    return { ref };
};