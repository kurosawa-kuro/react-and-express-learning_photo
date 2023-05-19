// src/hooks/useFlashMessage.js

import { useEffect } from 'react';
import { useFlashMessageStore } from '../state/store'

const useFlashMessage = (timeout = 3000) => {
    const { flashMessage, setFlashMessage } = useFlashMessageStore()

    useEffect(() => {
        let timer;
        if (flashMessage) {
            timer = setTimeout(() => {
                setFlashMessage('');
            }, timeout);
        }

        return () => clearTimeout(timer); // cleanup function
    }, [flashMessage, setFlashMessage, timeout]);

    return flashMessage; // return the flashMessage state
};

export default useFlashMessage;
