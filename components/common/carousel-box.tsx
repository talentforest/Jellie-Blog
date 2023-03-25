'use client';

import { ReactNode } from 'react';
import Carousel, { DotProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Props {
  children: ReactNode;
  config: {
    centerMode: boolean;
    showDots: boolean;
  };
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
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
        active ? 'bg-yellow-400' : 'bg-white'
      } relative border border-slate-300 w-3 h-3 mx-0.5 rounded-full transition`}
    >
      <button className='w-3 h-3 absolute top-0 left-0' onClick={onClick} />
    </li>
  );
};

export default function CarouselBox({ children, config }: Props) {
  const { centerMode, showDots } = config;
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      swipeable={true}
      draggable={true}
      showDots={showDots}
      centerMode={centerMode}
      customDot={<CustomDot />}
      containerClass='flex items-center pt-1 pb-10 mt-3 -mx-4 md:-mx-0'
      customTransition='transform 0.8s ease-in-out'
      itemClass='px-1 h-[180px]'
    >
      {children}
    </Carousel>
  );
}
