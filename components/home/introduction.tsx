'use client';

import { ReactNode } from 'react';
import Avatar from '../common/avatar';

interface Props {
  introduction?: string;
  children?: ReactNode;
}

export default function Introduction({ introduction, children }: Props) {
  return (
    <section className='w-full md:w-3/4 mx-auto mt-14 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center'>
      <Avatar />

      <div className='flex-1 items-center justify-center flex flex-col m-4 md:m-0 md:ml-5 md:items-start'>
        <h3 className='font-normal'>🌼 젤리 🌼</h3>
        <p className='text-[15px] leading-6 tracking-wide text-center md:text-start my-4'>
          개발을 통해 세상에 도움이 될 수 있다고 믿습니다. {introduction}
        </p>

        {children}
      </div>
    </section>
  );
}
