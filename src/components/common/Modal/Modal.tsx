import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  visible: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__window">
        <button className="modal__close" type="button" onClick={onClose}>
          ✕
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
};
