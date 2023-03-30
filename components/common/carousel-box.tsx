'use client';

import { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
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

export default function CarouselBox({ children, config }: Props) {
  const { centerMode, showDots } = config;

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      swipeable={true}
      showDots={showDots}
      centerMode={centerMode}
      containerClass='flex items-center pt-1 pb-10 mt-3 '
      customTransition='transform 0.8s ease-in-out'
      itemClass='px-1 h-[180px]'
      dotListClass='[&>.react-multi-carousel-dot--active>button]:bg-yellow '
    >
      {children}
    </Carousel>
  );
}
