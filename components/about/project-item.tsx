import Image from 'next/image';
import StackBox from '../common/stack-box';
import { Project } from '@/service/about';
import { FaGithub } from 'react-icons/fa';
import { RiArticleFill, RiLink } from 'react-icons/ri';
import Link from 'next/link';

interface Props {
  project: Project;
}

export default function ProjectItem({
  project: { name, path, description, stacks, link, github, relatedPosts },
}: Props) {
  return (
    <li className='hover:-translate-y-1.5 group hover:border-indigo overflow-hidden transition rounded-xl bg-box border-2 border-gray flex flex-col shadow-md'>
      <Image
        src={`/images/about/${path}`}
        alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
        width={400}
        height={400}
        priority
        className='w-full opacity-60 group-hover:opacity-100 h-48 object-cover'
      />

      <div className='px-3 py-2'>
        <h5 className='group-hover:text-indigo font-bold mb-1.5 flex items-center text-lg font-king'>
          # {name}
        </h5>
        <p className='my-1 py-1 text-base text-teal leading-6'>{description}</p>

        <ul className='mt-1 mb-4 flex flex-wrap gap-1.5'>
          {stacks.map((stack) => (
            <StackBox key={stack} stack={stack} />
          ))}
        </ul>

        <div className='flex gap-3 flex-1 items-end'>
          {link.length !== 0 && (
            <a
              href={link}
              target='_blank'
              title={`${name} 페이지`}
              className='text-slate group-hover:text-text hover:text-slate underline flex items-center gap-0.5 w-fit text-sm'
            >
              <RiLink className='text-slate group-hover:text-text w-4 h-4 mr-0.5' />
              <span>바로가기</span>
            </a>
          )}

          {github.length !== 0 && (
            <a
              href={github}
              target='_blank'
              title={`${name} github 페이지`}
              className='text-slate group-hover:text-text hover:text-slate underline flex items-center gap-0.5 w-fit text-sm'
            >
              <FaGithub className='text-slate group-hover:text-text w-4 h-4 mr-0.5' />
              <span>GitHub</span>
            </a>
          )}

          {relatedPosts.length !== 0 && (
            <Link
              href={`/posts/${relatedPosts}`}
              title={`프로젝트 관련 포스트`}
              className='text-slate group-hover:text-text hover:text-slate underline flex items-center gap-0.5 w-fit text-sm'
            >
              <RiArticleFill className='text-slate group-hover:text-text w-4 h-4 mr-0.5' />
              <span>관련 포스트</span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
