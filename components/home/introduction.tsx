import GitHub from 'components/assets/github.svg';
import Notion from 'components/assets/notion.svg';

export default function Introduction() {
  return (
    <section className='w-full pb-16 px-6 flex justify-between items-center space-x-4'>
      <div className='bg-blue-500 w-28 h-28 rounded-full shadow-md flex justify-center items-center'></div>
      <div className='flex-1'>
        <h3 className='font-semibold mb-2'>🌼 Jellie 🌼</h3>
        <p className='text-sm mb-4'>
          매일 기록하며 성장하는 프론트엔드 개발자 젤리입니다.
        </p>
        <ul className='flex space-x-2'>
          <li>
            <a
              href='https://github.com/talentforest'
              target='_blank'
              title='Jellie의 깃헙 페이지'
            >
              <GitHub className='w-5 h-5 cursor-pointer' />
            </a>
          </li>
          <li>
            <a
              href='https://jellieplanet.notion.site/STUDY-RECORD-7d13d4a899db4226b2c1687425b8230c'
              target='_blank'
              title='Jellie의 기존 공부 기록을 담은 노션 페이지'
            >
              <Notion className='w-5 h-5 cursor-pointer' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
