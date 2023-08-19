import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton (props) {
    const { modalComponent, buttonText, onButtonClick, closeModal } = props;
    const { setContentModal, setOnCloseModal } = useModal();

    const handleClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof closeModal === "function") setOnCloseModal(closeModal);
        setContentModal(modalComponent);
    }

    return <button onClick={handleClick}>{buttonText}</button>
}

export default OpenModalButton;
