'use client';

import { Post } from '@/service/posts';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import ArrowCircle from './arrow-circle';
import Image from 'next/image';
import CategoryBox from './category-box';

interface PostBoxProps {
  post: Post;
  direction?: 'prev' | 'next';
  children: ReactNode;
  imgHeight?: number;
}

export default function PostBoxContainer({
  post,
  direction,
  imgHeight = 48,
  children,
}: PostBoxProps) {
  const [loading, setLoading] = useState(true);

  const { path, category, title, thumbnail } = post;

  useEffect(() => {
    setLoading(false);
  }, []);

  const categoryBoxStyle =
    '[&>.categorybox]:absolute [&>.categorybox]:top-2 [&>.categorybox]:left-2 md:[&>.categorybox]:left-2 [&>.categorybox]:opacity-60';

  return loading ? (
    <div
      className={`relative h-${imgHeight} flex justify-center items-center bg-box transition rounded-2xl px-3.5 py-3`}
    >
      <span className='text-slate'>loading...</span>
    </div>
  ) : (
    <Link
      href={`/posts/${path}`}
      className={`${categoryBoxStyle} group hover:-translate-y-2 hover:border-2 border-light-yellow rounded-2xl transition relative w-full h-full flex flex-col shadow-md shadow-light-gray`}
    >
      <Image
        src={`/images/${category}/${thumbnail}`}
        alt={`${title} 썸네일`}
        width={300}
        height={200}
        priority
        className={`w-full h-${imgHeight} rounded-t-2xl object-cover`}
      />

      <CategoryBox category={category} />

      <article
        className={`flex-1 border border-light-gray rounded-2xl px-3.5 py-3 -mt-3 relative bg-box`}
      >
        {children}
      </article>

      {direction === 'next' && <ArrowCircle direction='next' />}
    </Link>
  );
}
