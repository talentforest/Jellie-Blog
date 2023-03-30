import { RxNotionLogo } from 'react-icons/rx';
import { GoMarkGithub } from 'react-icons/go';
import Image from 'next/image';

export default function Introduction() {
  return (
    <section className='w-full my-12 px-4 md:px-0 flex justify-between items-center space-x-4'>
      <Image
        src='/images/about/avatar.png'
        alt='avatar'
        width={200}
        height={200}
        priority
        className='w-32 h-32 object-cover rounded-full shadow-sm shadow-slate flex justify-center items-center'
      />
      <div className='flex-1'>
        <h3 className='font-semibold mb-2'>🌼 Jellie 🌼</h3>
        <p className='text-sm mb-4'>
          매일 기록하며 성장하는 프론트엔드 개발자 젤리입니다.
        </p>
        <div className='flex space-x-2'>
          <a
            href='https://github.com/talentforest'
            target='_blank'
            title='Jellie의 깃헙 페이지'
          >
            <GoMarkGithub className='w-5 h-5 cursor-pointer' />
          </a>
          <a
            href='https://jellieplanet.notion.site/STUDY-RECORD-7d13d4a899db4226b2c1687425b8230c'
            target='_blank'
            title='Jellie의 기존 공부 기록을 담은 노션 페이지'
          >
            <RxNotionLogo className='w-5 h-5 cursor-pointer' />
          </a>
        </div>
      </div>
    </section>
  );
}
