import { Post } from '@/service/posts';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

interface PostBoxProps {
  post: Post;
  prev?: boolean;
  sm?: boolean;
}

export default function PostBox({ post, prev, sm = false }: PostBoxProps) {
  const { path, category, title, description } = post;

  return (
    <Link
      key={path}
      href={`/posts/${path}`}
      className='flex justify-between items-center w-full h-full bg-box group hover:-translate-y-0.5 border border-slate hover:border-2 hover:border-yellow transition cursor-pointer rounded-xl p-2.5 select-none'
    >
      {!sm && prev && (
        <HiArrowLeft className='w-8 h-8 text-text group-hover:text-yellow' />
      )}
      <article
        className={`${
          prev ? 'items-end' : 'items-start'
        } w-full flex flex-col h-full`}
      >
        <h4 className='text-xs text-white mb-2 font-extralight border border-slate px-2 py-0.5 bg-indigo rounded-md w-fit'>
          {category}
        </h4>
        <h2 className='mb-1 font-bold text-lg'>{title}</h2>
        <p className='text-sm mb-2 text-slate'>{description}</p>
      </article>
      {!sm && !prev && (
        <HiArrowRight className='w-8 h-8 text-text group-hover:text-yellow' />
      )}
    </Link>
  );
}
