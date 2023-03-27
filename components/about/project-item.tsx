import Image from 'next/image';
import { Project } from '@/service/about';
import { GoMarkGithub } from 'react-icons/go';
import { HiLink, HiOutlineLightBulb } from 'react-icons/hi';

interface Props {
  project: Project;
}

export default function ProjectItem({
  project: { name, path, description, stacks, link, github },
}: Props) {
  return (
    <li className='rounded-lg bg-white dark:border-slate-600 dark:bg-slate-800 dark:text-white p-3 border flex flex-col shadow-md'>
      <h5 className='font-bold mb-2 flex items-center'>{name}</h5>
      <Image
        src={`/images/about/${path}`}
        alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
        width={400}
        height={400}
        className='w-full rounded-md border-2 h-40 object-cover'
        priority
      />
      <p className='border-l-4 mb-1 text-sm py-1 leading-6 bg-indigo-50 border-indigo-400 mt-1 px-2 dark:bg-gray-600'>
        <HiOutlineLightBulb className='inline w-5 h-5 mr-1 text-indigo-500 dark:text-yellow-400' />
        {description}
      </p>
      <ul className='mt-2 mb-4 flex flex-wrap gap-1'>
        {stacks.map((stack) => (
          <li
            key={stack}
            className='px-2 bg-slate-200 dark:bg-slate-600 dark:border-slate-400 border w-fit rounded-md text-sm'
          >
            {stack}
          </li>
        ))}
      </ul>
      <div className='flex gap-2'>
        <a
          href={link}
          target='_blank'
          title={`Jellie의 ${name} 페이지`}
          className='underline flex items-center gap-0.5 w-fit text-sm text-slate-500 dark:text-gray-100'
        >
          <HiLink className='w-4 h-4 text-gray-800 dark:text-gray-200' />
          <span>바로가기</span>
        </a>
        <a
          href={github}
          target='_blank'
          title={`Jellie의 ${name} github 페이지`}
          className='underline flex items-center gap-0.5 w-fit text-sm text-slate-500 dark:text-gray-100'
        >
          <GoMarkGithub className='w-4 h-4 text-gray-900 dark:text-gray-200' />
          <span>GitHub</span>
        </a>
      </div>
    </li>
  );
}
