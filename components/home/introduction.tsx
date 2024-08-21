'use client';

import { ReactNode } from 'react';
import Avatar from '../common/avatar';

interface Props {
  children?: ReactNode;
}

export default function Introduction({ children }: Props) {
  return (
    <section className='w-full md:w-3/4 mx-auto mt-14 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center'>
      <Avatar />

      <div className='flex-1 items-center justify-center flex flex-col m-4 md:m-0 md:ml-5 md:items-start'>
        <h3 className='font-normal'>✏️ 젤리</h3>
        <p className='text-[15px] leading-6 tracking-wide text-center md:text-start mt-3 mx-2'>
          안녕하세요. 곰돌이 젤리를 좋아하는{' '}
          <strong>프론트엔드 개발자 젤리</strong>입니다!
        </p>
        <p className='text-[15px] leading-6 tracking-wide text-center md:text-start mt-2 mx-2'>
          개발에 대해 학습한 내용을 나의 글로 정리하지 않으면 내것이 아니라고
          생각하고 이 블로그에서 정리하고 있습니다. 여기저기 썼던 글을 젤리
          블로그로 옮기고 있는 중입니다 🚛.
        </p>

        {children}
      </div>
    </section>
  );
}
