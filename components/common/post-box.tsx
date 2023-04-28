import { Post } from '@/service/posts';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai';
import Link from 'next/link';

interface PostBoxProps {
  post: Post;
  prev?: boolean;
  sm?: boolean;
}

export default function PostBox({ post, prev, sm = false }: PostBoxProps) {
  const {
    path,
    category,
    title,
    description,
    date,
    content,
    readingTime, //
  } = post;

  return (
    <Link
      href={`/posts/${path}`}
      className='flex justify-between items-center w-full h-full bg-box group hover:-translate-y-0.5 border border-slate hover:border-2 hover:border-yellow transition cursor-pointer rounded-xl p-2.5 select-none hover:bg-bg'
    >
      {!sm && prev && (
        <HiArrowLeft className='w-8 h-8 text-text group-hover:text-yellow' />
      )}
      <article
        className={`${
          prev ? 'items-end' : 'items-start'
        } w-full justify-between flex flex-col h-full`}
      >
        <h4 className='text-xs text-text mb-2 font-extralight border border-slate px-2 py-0.5 bg-box rounded-full w-fit'>
          {category}
        </h4>
        <h2 className='mb-2 font-bold text-lg'>{title}</h2>
        <h3 className='text-sm mb-3 text-teal'>{description}</h3>
        {!sm && (
          <p className='flex-1 text-sm leading-6 mb-4 text-slate'>
            {content
              .slice(0, 100)
              .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')}
            ...
          </p>
        )}
        <div
          className={`${
            sm ? 'flex-col items-start' : 'flex-row space-x-2'
          } flex gap-1`}
        >
          <span className='flex items-center gap-x-1 text-sm text-slate'>
            <AiFillCalendar className='h-3.5 w-3.5' />
            {new Date(date).toLocaleDateString('ko')}
          </span>
          <span className='flex items-center gap-x-1 text-sm text-slate'>
            <AiFillClockCircle className='h-3.5 w-3.5' />
            {Math.ceil(readingTime)} min to read
          </span>
        </div>
      </article>
      {!sm && !prev && (
        <HiArrowRight className='w-8 h-8 text-text group-hover:text-yellow' />
      )}
    </Link>
  );
}
