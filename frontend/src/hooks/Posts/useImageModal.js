import { useState } from 'react';

export const useImageModal = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage("http://localhost:8080/uploads/" + image.imagePath);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return { selectedImage, openModal, closeModal };
};
