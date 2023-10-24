import React from 'react';

export interface BaseModalProps {
  onClose: () => void;
}

export interface AlertModalProps extends BaseModalProps {
  type: 'alert';
  alertMessage: string;
}

export interface ConfirmModalProps extends BaseModalProps {
  type: 'confirm';
  confirmMessage: string;
  onButton: () => void;
}

export interface CustomModalProps extends BaseModalProps {
  type: 'custom';
  title: string;
  buttonLabel: string;
  children: React.ReactNode;
  onButton: () => void;
}

export type ModalProps = AlertModalProps | ConfirmModalProps | CustomModalProps;
