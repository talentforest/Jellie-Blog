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
    <li className='rounded-lg bg-box p-3 border border-slate flex flex-col shadow-md'>
      <h5 className='font-bold mb-2 flex items-center'>{name}</h5>
      <Image
        src={`/images/about/${path}`}
        alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
        width={400}
        height={400}
        className='w-full rounded-md border-2 h-40 object-cover'
        priority
      />
      <p className='border-l-4 border-slate bg-bg mb-1 text-sm py-1 leading-6 mt-1 px-2'>
        <HiOutlineLightBulb className='inline w-5 h-5 mr-1 text-text' />
        {description}
      </p>
      <ul className='mt-2 mb-4 flex flex-wrap gap-1'>
        {stacks.map((stack) => (
          <li
            key={stack}
            className='bg-bg px-2 border border-slate w-fit rounded-md text-sm'
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
          className='underline flex items-center gap-0.5 w-fit text-sm text-text'
        >
          <HiLink className='w-4 h-4 text-text' />
          <span>바로가기</span>
        </a>
        <a
          href={github}
          target='_blank'
          title={`Jellie의 ${name} github 페이지`}
          className='underline flex items-center gap-0.5 w-fit text-sm text-text'
        >
          <GoMarkGithub className='w-4 h-4 text-text' />
          <span>GitHub</span>
        </a>
      </div>
    </li>
  );
}
