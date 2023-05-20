// frontend\src\hooks\Posts\useImageModal.js

import { useState } from 'react';

export const useImageModal = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imagePath) => {
        setSelectedImage("http://localhost:8080/uploads/" + imagePath);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return { selectedImage, openModal, closeModal };
};
