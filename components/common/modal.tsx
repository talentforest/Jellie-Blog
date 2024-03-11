import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  toggleModal: () => void;
}

export default function Modal({ children, toggleModal }: Props) {
  return (
    <>
      <div
        onClick={toggleModal}
        className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-black opacity-50'
      />
      <div className='overflow-scroll scrollbar-hide transition z-20 fixed inset-0 m-auto w-fit h-fit min-w-[50%] max-h-[75%] border-2 border-slate bg-bg rounded-xl'>
        {children}
      </div>
    </>
  );
}
