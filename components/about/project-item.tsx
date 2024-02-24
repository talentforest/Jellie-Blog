import Image from 'next/image';
import { Project } from '@/service/about';
import { FaGithub } from 'react-icons/fa';
import { RiArticleFill, RiLink } from 'react-icons/ri';

interface Props {
  project: Project;
}

export default function ProjectItem({
  project: { name, path, description, stacks, link, github, relatedPosts },
}: Props) {
  return (
    <li className='hover:-translate-y-1.5 group hover:border-indigo overflow-hidden transition rounded-xl bg-box border-2 border-slate flex flex-col shadow-md'>
      <Image
        src={`/images/about/${path}`}
        alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
        width={400}
        height={400}
        className='w-full opacity-60 group-hover:opacity-100 h-48 object-cover'
        unoptimized
      />

      <div className='px-3 py-2'>
        <h5 className='group-hover:text-indigo font-bold mb-2 flex items-center text-lg font-king'>
          # {name}
        </h5>
        <p className='my-1 py-1 text-sm text-teal leading-6'>{description}</p>

        <ul className='mt-1 mb-4 flex flex-wrap gap-1.5'>
          {stacks.map((stack) => (
            <li
              key={stack}
              className='bg-bg px-2.5 py-0.5 border border-slate w-fit rounded-md text-sm h-fit'
            >
              {stack}
            </li>
          ))}
        </ul>

        <div className='flex gap-3 flex-1 items-end'>
          {link.length !== 0 && (
            <a
              href={link}
              target='_blank'
              title={`Jellie의 ${name} 페이지`}
              className='hover:text-slate underline flex items-center gap-0.5 w-fit text-sm text-text'
            >
              <RiLink className='w-4 h-4 text-slate mr-0.5' />
              <span>바로가기</span>
            </a>
          )}
          {github.length !== 0 && (
            <a
              href={github}
              target='_blank'
              title={`Jellie의 ${name} github 페이지`}
              className='hover:text-slate underline flex items-center gap-0.5 w-fit text-sm text-text'
            >
              <FaGithub className='w-4 h-4 text-text mr-0.5' />
              <span>GitHub</span>
            </a>
          )}
          {relatedPosts.length !== 0 && (
            <a
              href={relatedPosts}
              target='_blank'
              title={`프로젝트 관련 포스트`}
              className='hover:text-slate underline flex items-center gap-0.5 w-fit text-sm text-text'
            >
              <RiArticleFill className='w-4 h-4 text-slate mr-0.5' />
              <span>관련 포스트 보기</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
