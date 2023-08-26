// frontend/src/context/Modal.js

import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [contentModal, setContentModal] = useState(null);
  const [onCloseModal, setOnCloseModal] = useState(null);

  const closeModal = () => {
    if (typeof onCloseModal === "function") {
      onCloseModal();
      setOnCloseModal(null);
    }
    setContentModal(null);
  };

  const contextValue = {
    modalRef,
    contentModal,
    setContentModal,
    setOnCloseModal,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, contentModal, closeModal } = useContext(ModalContext);
  if (!modalRef || !modalRef.current || !contentModal) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{contentModal}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
