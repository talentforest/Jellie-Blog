import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  openToc: boolean;
  toggleModal: () => void;
}

export default function Modal({ openToc, children, toggleModal }: Props) {
  const isVisibleClassName = openToc ? '' : 'hidden';

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={toggleModal}
        className={`md:hidden ${isVisibleClassName} overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-black opacity-50`}
      />
      {/* 모달 */}
      <div
        className={`md:hidden ${isVisibleClassName} overflow-scroll scrollbar-hide z-20 fixed inset-0 m-auto w-fit h-fit min-w-[80%] max-h-[75%] border-2 border-slate bg-bg rounded-xl transition animate-[slideup_300ms]`}
      >
        {children}
      </div>
    </>
  );
}
