'use client';

import { Post } from '@/service/posts';
import { convertChar, cutLetter } from '@/util';
import Carousel, { DotProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';

interface Props {
  allPosts: Post[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const CustomDot = ({ onClick, active }: DotProps) => {
  return (
    <li
      className={`${
        active ? 'bg-yellow-300' : 'bg-white'
      } border h-3 rounded-sm w-2/12 relative transition`}
    >
      <button className='w-full h-3 absolute top-0 left-0' onClick={onClick} />
    </li>
  );
};

export default function FeaturedPosts({ allPosts }: Props) {
  return (
    <Carousel
      className='h-64 flex items-center mt-3 -mx-4 md:-mx-0 bg-gradient-to-b from-indigo-500 via-purple-400 to-blue-500'
      responsive={responsive}
      infinite={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      customDot={<CustomDot />}
      ssr={true}
      centerMode={true}
      containerClass='carousel-container'
      itemClass='carousel-item'
    >
      {allPosts.map(({ id, title, category, contents }) => (
        <Link key={id} href={`/posts/${convertChar(title, ' ', '-')}`}>
          <article className='cursor-pointer flex flex-col bg-white h-full rounded-xl transition ease-in-out delay-700 p-2.5 mx-1 shadow-lg select-none'>
            <h4 className='text-sm mb-2'>{category}</h4>
            <h1 className='mb-1 font-bold'>{title}</h1>
            <p className='text-sm text-gray-500 flex-1 overflow-hidden'>
              {cutLetter(contents, 80)}
            </p>
          </article>
        </Link>
      ))}
    </Carousel>
  );
}
