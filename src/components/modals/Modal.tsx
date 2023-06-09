import { type ReactNode, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

import IconButton from '@/components/buttons/IconButton';
import Overlay from '@/components/Overlay';
import { ESC_KEY_CODE } from '@/lib/configs';

export type ModalProps = {
  visible: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  hideCloseBtn?: boolean;
  zIndexClass?: string;
  hasBorderInFooter?: boolean;
  modalClass?: string;
  children?: ReactNode;
  controlArea?: ReactNode;
  onClose(): void;
};

const Modal: React.FC<ModalProps> = ({
  visible,
  header,
  footer,
  hideCloseBtn = false,
  loading = false,
  children,
  modalClass = '',
  zIndexClass = 'z-[100]',
  onClose = () => null,
  controlArea,
  hasBorderInFooter = true,
}) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'visible';
  }, [showModal]);

  useEffect(() => {
    const delayTimeout = setTimeout(
      () => {
        setShowModal(visible);
      },
      visible ? 0 : 300
    );

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [visible]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (visible && event.keyCode === ESC_KEY_CODE) {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose, visible]);

  return (
    <div
      className={`fixed inset-0 inset-x-0 h-full transition-all ${zIndexClass} top-0 overflow-auto
        ${
          showModal
            ? 'flex-center opacity-100 duration-300 ease-out'
            : 'opacity-0 duration-200 ease-in '
        }
        ${visible ? '' : 'hidden'}`}
    >
      <div
        className={`fixed inset-0 transition-opacity ${
          visible && showModal
            ? 'opacity-100 duration-300 ease-out'
            : 'opacity-0 duration-200 ease-in'
        }`}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={onClose} />
      </div>

      <div
        aria-label="modal-dialog"
        className={`absolute flex h-auto w-6/12 w-full justify-center ${modalClass}`}
      >
        <div
          className={`relative my-8 w-full overflow-auto bg-white shadow-xl transition-all duration-200 ${
            showModal
              ? visible
                ? 'translate-y-0 scale-100 opacity-100 ease-out'
                : 'translate-y-4 scale-95 opacity-0 ease-in'
              : 'translate-y-4 translate-y-4 scale-95 opacity-0 ease-in'
          }`}
        >
          <div className="items absolute right-0 top-0 z-[100] block flex justify-end gap-1 pr-4 pt-4">
            {controlArea}
            {!!header && !hideCloseBtn && (
              <IconButton className="" onClick={onClose}>
                <MdClose size={24} />
              </IconButton>
            )}
          </div>

          <div className="flex items-start p-6">
            <div className="mt-0 w-full text-left">
              {header}
              <div className="mt-2">
                <Overlay loading={Boolean(loading)}>{children}</Overlay>
              </div>
            </div>
          </div>

          {!!footer && (
            <div
              className={`sticky inset-x-0 bottom-0 bg-white p-6 ${
                hasBorderInFooter ? 'border-t' : ''
              }`}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
