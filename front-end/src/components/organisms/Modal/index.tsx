import React from 'react';
import Image from 'next/image';
import { ModalProps, AlertModalProps, ConfirmModalProps, CustomModalProps } from '@/types/props/ModalProps';
import Button from '@/components/atoms/Button';
import ModalStyle from './Modal.module.scss';

/**
 * 커스텀 모달
 * - `type = alert` 일 경우 필수 props : `onClose`, `alertMessage`
 * - `type = confirm` 일 경우 필수 props : `onClose`, `confirmMessage`, `onButton`
 * - `type = custom` 일 경우 필수 props : `onClose`, `children`, `buttonLabel`, `onButton`
 */
function Modal(props: ModalProps) {
  const { type } = props;

  if (type === 'alert') {
    const { alertMessage, onClose } = props as AlertModalProps;
    return (
      <div className={ModalStyle.overlay} aria-hidden="true">
        <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
          <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
            <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
          </button>
          <div className="flex flex-col">
            <div className="my-4 mx-4 font-semibold col-span-1">{alertMessage}</div>
            <div className="flex mx-4 justify-end items-end col-span-1">
              <Button label="확인" variant="solid" onClick={onClose} radius="full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'confirm') {
    const { confirmMessage, onClose, onButton } = props as ConfirmModalProps;
    return (
      <div className={ModalStyle.overlay} aria-hidden="true">
        <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
          <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
            <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
          </button>
          <div className="flex flex-col">
            <div className="my-4 mx-4 font-semibold">{confirmMessage}</div>
            <div className="flex mx-4 justify-end items-end gap-2">
              <Button label="취소" variant="bordered" onClick={onClose} radius="sm" />
              <Button label="확인" variant="solid" onClick={onButton} radius="sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'custom') {
    const { title, buttonLabel, children, onButton, onClose } = props as CustomModalProps;
    return (
      <div className={ModalStyle.overlay} aria-hidden="true">
        <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
          <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
            <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
          </button>
          <div className="my-4 mx-4">
            <div className="font-bold text-xl my-2">{title}</div>
            <div>{children}</div>
          </div>
          <div className="flex justify-center">
            <Button label={buttonLabel} variant="solid" onClick={onButton} radius="sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
