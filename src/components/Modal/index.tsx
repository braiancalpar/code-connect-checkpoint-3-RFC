"use client";
import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import styles from "./modal.module.css";
export interface ModalHandle {
  openModal: () => void;
  closeModal: () => void;
}
export const Modal = forwardRef<ModalHandle, { children: ReactNode }>(
  function Modal({ children }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
      openModal: () => dialogRef.current?.showModal(),
      closeModal: () => dialogRef.current?.close(),
    }));
    return (
      <dialog className={styles.dialog} ref={dialogRef}>
        <header className={styles.header}>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>
        {children}
      </dialog>
    );
  },
);
