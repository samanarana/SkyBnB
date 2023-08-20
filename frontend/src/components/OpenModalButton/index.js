import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton (props) {
    const { modalComponent, buttonText, onButtonClick, closeModal, closeDropdown } = props;
    const { setContentModal, setOnCloseModal } = useModal();

    const handleClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof closeModal === "function") setOnCloseModal(closeModal);
        setContentModal(modalComponent);
        if (typeof closeDropdown === "function") closeDropdown();
    }

    return <span onClick={handleClick} className="clickable-text">{buttonText}</span>;
}

export default OpenModalButton;
