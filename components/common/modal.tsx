import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  openModal: boolean;
  toggleModal: () => void;
}

export default function Modal({ openModal, children, toggleModal }: Props) {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  return (
    <div className={`${openModal ? '' : 'hidden'} z-[1002] fixed inset-0 `}>
      {/* 오버레이 */}
      <div
        onClick={toggleModal}
        className={`cursor-pointer overflow-hidden transition w-full h-screen bg-black opacity-90`}
      />

      {/* 모달 */}
      <div
        className={`rounded-md overflow-scroll scrollbar-hide fixed inset-y-0 inset-x-4 m-auto w-fit h-fit max-h-[78%] transition animate-[slideup_300ms]`}
      >
        {children}
      </div>
    </div>
  );
}
