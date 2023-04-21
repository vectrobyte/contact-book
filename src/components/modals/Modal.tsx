import { type ReactNode, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

import LoadingOverlay from '@/components/LoadingOverlay';

export type ModalProps = {
  visible: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  hideCloseBtn?: boolean;
  zIndexClass?: string;
  hasBorderInFooter?: boolean;
  onClose(): void;
};

const ESC_KEY_CODE = 27;

const Modal: React.FC<ModalProps> = ({
  visible,
  header,
  footer,
  hideCloseBtn = false,
  loading = false,
  children,
  zIndexClass = 'z-100',
  onClose = () => null,
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
      className={`fixed inset-x-0 h-full transition-all sm:inset-0 ${zIndexClass} top-0 overflow-auto
        ${
          showModal
            ? 'opacity-100 duration-300 ease-out sm:flex sm:items-center sm:justify-center'
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
        <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose} />
      </div>

      <div className="absolute flex h-full w-full md:h-auto md:w-6/12 lg:justify-center">
        <div
          className={`relative w-full overflow-auto bg-white shadow-xl transition-all lg:my-8 ${
            showModal
              ? visible
                ? 'translate-y-0 opacity-100 duration-300 ease-out sm:translate-y-0 sm:scale-100'
                : 'translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-4 sm:scale-95 '
              : 'translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-4 sm:scale-95 '
          }`}
        >
          {!!header && !hideCloseBtn && (
            <div className="absolute right-0 top-0 z-10 pr-6 pt-6 sm:block">
              <button className="" onClick={onClose}>
                <span>
                  <MdClose size={24} />
                </span>
              </button>
            </div>
          )}
          <div className="p-4 sm:flex sm:items-start lg:p-8">
            <div className="mt-3 w-full sm:mt-0 sm:text-left">
              {header}
              <div className="mt-2">
                <LoadingOverlay loading={Boolean(loading)}>{children}</LoadingOverlay>
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
