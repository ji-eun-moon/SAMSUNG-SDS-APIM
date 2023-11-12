import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ModalProps,
  AlertModalProps,
  ConfirmModalProps,
  CustomModalProps,
  ServerModalProps,
} from '@/types/props/ModalProps';
import StyledButton from '@/components/atoms/StyledButton';
import ModalStyle from './Modal.module.scss';

/**
 * 커스텀 모달
 * - `type = alert` 일 경우 필수 props : `onClose`, `alertMessage`
 * - `type = confirm` 일 경우 필수 props : `onClose`, `confirmMessage`, `onButton`
 * - `type = custom` 일 경우 필수 props : `onClose`, `children`, `buttonLabel`, `onButton`
 */
function Modal({ type, onClose, ...props }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (e: MouseEvent) => {
    e.preventDefault();
    setIsClosing(true);
    // 페이드 아웃 애니메이션을 위해 실제로 닫히는 것을 지연시킵니다.
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500); // CSS 애니메이션 기간에 맞추어 조절하세요.
  };

  useEffect(() => {
    if (isClosing) {
      const modal = document.querySelector(`.${ModalStyle.modal}`);
      if (modal) {
        modal.classList.add('closing'); // 여기서 'closing' 클래스를 추가합니다.
        modal.addEventListener('animationend', () => {
          onClose();
        });
      }
    }
  }, [isClosing, onClose]);
  if (type === 'alert') {
    const { alertMessage } = props as AlertModalProps;
    return (
      <div className={!isClosing ? ModalStyle.overlay : ModalStyle.overlayClosing} aria-hidden="true">
        <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
          <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
            <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
          </button>
          <div className="flex flex-col">
            <div className="my-4 mx-4 font-semibold col-span-1">{alertMessage}</div>
            <div className="flex mx-4 justify-end items-end col-span-1">
              <div className="w-20">
                <StyledButton label="확인" variant="solid" onClick={onClose} radius="lg" type="button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'confirm') {
    const { confirmMessage, onButton } = props as ConfirmModalProps;
    return (
      <div className={ModalStyle.overlay} aria-hidden="true">
        <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
          <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
            <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
          </button>
          <div className="flex flex-col">
            <div className="my-4 mx-4 font-semibold">{confirmMessage}</div>
            <div className="flex mx-4 justify-end items-end gap-2">
              <div className="w-20">
                <StyledButton label="취소" variant="bordered" onClick={onClose} radius="sm" type="button" />
              </div>
              <div className="w-20">
                <StyledButton label="확인" variant="solid" onClick={onButton} radius="sm" type="button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'custom') {
    const { title, buttonLabel, children, onButton } = props as CustomModalProps;
    return (
      <div className={ModalStyle.overlay} aria-hidden="true">
        <div className={ModalStyle.show}>
          <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
            <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
              <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
            </button>
            <div className="my-4 mx-4">
              <div className="font-bold text-xl my-2">{title}</div>
              <div>{children}</div>
            </div>
            <div className="flex justify-center">
              <div className="w-fit">
                <StyledButton label={buttonLabel} variant="solid" onClick={onButton} radius="sm" type="button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // if (type === 'custom') {
  //   const { title, buttonLabel, children, onButton } = props as CustomModalProps;
  //   return (
  //     <div className={ModalStyle.overlay} aria-hidden="true">
  //       <div className={ModalStyle.modal} onClick={(e) => e.stopPropagation} aria-hidden="true">
  //         <button type="button" onClick={onClose} className={ModalStyle.closeButton}>
  //           <Image src="/icons/close.png" alt="close-icon" width={15} height={15} />
  //         </button>
  //         <div className="my-4 mx-4">
  //           <div className="font-bold text-xl my-2">{title}</div>
  //           <div>{children}</div>
  //         </div>
  //         <div className="flex justify-center">
  //           <div className="w-fit">
  //             <StyledButton label={buttonLabel} variant="solid" onClick={onButton} radius="sm" type="button" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (type === 'server') {
    const { children } = props as ServerModalProps;
    return (
      <button type="button" className={ModalStyle.overlay} aria-hidden="true" onClick={handleClose}>
        <button type="button" onClick={(e) => e.stopPropagation()} aria-hidden="true" className="relative">
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="absolute"
            style={{ right: '2%', top: '3%' }}
          >
            <Image src="/icons/close.png" alt="close-icon" width={10} height={10} onClick={onClose} />
          </button>
          <button type="button" onClick={(e) => e.stopPropagation()}>
            <div>{children}</div>
          </button>
        </button>
      </button>
    );
  }
}

export default Modal;
