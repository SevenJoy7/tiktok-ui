import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ Children }) {
    const [active, setActive] = useState(false);

    const handleShowModal = () => {
        setActive(true);
    };

    const handleHideModal = () => {
        setActive(false);
    };

    const value = {
        active,
        handleShowModal,
        handleHideModal,
    };

    return <ModalContext.Provider value={value}>{Children}</ModalContext.Provider>;
}

export { ModalContext, ModalProvider };
