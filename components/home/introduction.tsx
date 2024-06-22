'use client';

import Avatar from '../common/avatar';

interface Props {
  introduction?: string;
}

export default function Introduction({ introduction }: Props) {
  return (
    <section className='w-full mt-14 mb-10 md:mb-20 px-4 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center md:px-6'>
      <Avatar />

      <div className='mt-4 flex-1 items-center justify-center flex flex-col md:ml-5 md:items-start'>
        <h3 className='font-normal'>🌼 젤리 🌼</h3>
        <p className='text-[15px] leading-6 m-4 md:mx-0 tracking-wide text-center md:text-start'>
          서비스와 함께 성장하는 프론트엔드 개발자 젤리입니다. 개발을 통해
          세상에 도움이 될 수 있다고 믿습니다.
          {introduction}
        </p>
      </div>
    </section>
  );
}
