'use client';

import { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Props {
  children: ReactNode;
  config: {
    centerMode: boolean;
    showDots: boolean;
    swipeable?: boolean;
    infinite?: boolean;
    autoPlay?: boolean;
    arrows?: boolean;
  };
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
};

export default function CarouselBox({ children, config }: Props) {
  const {
    centerMode,
    showDots,
    swipeable = true,
    infinite = true,
    autoPlay = false,
    arrows = true,
  } = config;

  return (
    <Carousel
      responsive={responsive}
      infinite={infinite}
      autoPlay={autoPlay}
      swipeable={swipeable}
      showDots={showDots}
      centerMode={centerMode}
      arrows={arrows}
      customTransition='transform 0.8s ease-in-out'
      containerClass='flex items-center pt-1 pb-10 mt-3 z-0'
      itemClass='px-1'
      dotListClass='[&>.react-multi-carousel-dot--active>button]:bg-yellow'
    >
      {children}
    </Carousel>
  );
}
