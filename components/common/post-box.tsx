import { Post } from '@/service/posts';
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
        size === 'sm'
          ? 'bg-gradient-to-b dark:from-indigo-700 dark:via-indigo-900 dark:to-blue-600 from-indigo-200 via-purple-200 to-blue-200'
          : 'bg-white'
      } dark:bg-slate-700 hover:-translate-y-1 transition cursor-pointer flex flex-col bg-white w-full h-full rounded-xl p-2.5 shadow-sm hover:shadow-lg select-none`}
    >
      <article className='flex flex-col'>
        <h4 className='text-xs text-slate-600 mb-2 font-extralight border px-2 py-0.5 bg-blue-100 rounded-md w-fit'>
          {category}
        </h4>
        <h1 className='mb-1 font-bold text-lg'>{title}</h1>
        <p className='text-sm mb-2 dark:text-slate-200 text-slate-700'>
          {description}
        </p>
      </article>
    </Link>
  );
}
