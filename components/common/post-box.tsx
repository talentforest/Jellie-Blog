import { Post } from '@/service/posts';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';

interface PostBoxProps {
  post: Post;
  size?: 'sm' | 'lg';
}

export default function PostBox({ post, size = 'sm' }: PostBoxProps) {
  const { path, category, title, description } = post;

  return (
    <Link
      key={path}
      href={`/posts/${path}`}
      className={`${
        size === 'sm' ? '' : 'items-center'
      } bg-box  group hover:-translate-y-0.5 border border-slate hover:border-2 hover:border-yellow transition cursor-pointer flex justify-between w-full h-full rounded-xl p-2.5 select-none`}
    >
      <article className='flex flex-col'>
        <h4 className='text-xs text-white mb-2 font-extralight border border-slate px-2 py-0.5 bg-indigo rounded-md w-fit'>
          {category}
        </h4>
        <h2 className='mb-1 font-bold text-lg'>{title}</h2>
        <p className='text-sm mb-2 text-slate'>{description}</p>
      </article>
      {size !== 'sm' && (
        <HiArrowRight className='w-8 h-8 hidden group-hover:block text-yellow' />
      )}
    </Link>
  );
}
