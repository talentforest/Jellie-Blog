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
        className={`lg:hidden cursor-pointer ${isVisibleClassName} overflow-hidden transition fixed bottom-0 top-0 z-[1002] left-0 right-0 mx-auto w-full h-screen bg-black opacity-50`}
      />
      {/* 모달 */}
      <div
        className={`lg:hidden ${isVisibleClassName} overflow-scroll scrollbar-hide z-[1002] fixed inset-0 m-auto h-fit w-[80%] md:w-[50%] max-h-[85%] border-2 border-slate bg-bg rounded-xl transition animate-[slideup_300ms]`}
      >
        {children}
      </div>
    </>
  );
}
