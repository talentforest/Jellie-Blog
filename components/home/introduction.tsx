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
        <h3 className='font-normal'>✏️ 젤리</h3>
        <p className='text-[15px] leading-6 tracking-wide text-center md:text-start mt-4 mx-2'>
          안녕하세요. 곰돌이 젤리를 좋아하는 프론트엔드 개발자 젤리입니다! 이
          블로그 공간에서 개발과 관련된 것들을 정리하고 기록하고 있어요. 매일
          아주 조금씩이라도 정체되지 않고 성장하는 개발자이고자 합니다.
        </p>

        {children}
      </div>
    </section>
  );
}
