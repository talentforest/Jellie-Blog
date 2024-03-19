'use client';

import { ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type ResponsiveSetting = {
  breakpoint: { max: number; min: number };
  items: number;
};

type Responsive = {
  desktop: ResponsiveSetting;
  tablet: ResponsiveSetting;
};

interface Props {
  children: ReactNode;
  responsive?: Responsive;
  config: {
    arrowColor?: 'light-yellow' | 'gray';
    centerMode: boolean;
    showDots?: boolean;
    swipeable?: boolean;
    infinite?: boolean;
    autoPlay?: boolean;
    arrows?: boolean;
  };
}

const defaultResponsive: Responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 0 },
    items: 1,
  },
};

export default function CarouselBox({ children, config, responsive }: Props) {
  const {
    centerMode,
    showDots = true,
    swipeable = true,
    infinite = true,
    autoPlay = false,
    arrows = true,
    arrowColor = 'gray',
  } = config;

  const arrowCircleStyle = `bg-${arrowColor} opacity-60 absolute top-[43%] rounded-full w-12 h-12 flex items-center justify-center cursor-pointer`;

  const arrowStyle = 'text-lg text-text';

  return (
    <Carousel
      responsive={responsive || defaultResponsive}
      infinite={infinite}
      autoPlay={autoPlay}
      swipeable={swipeable}
      showDots={showDots}
      centerMode={centerMode}
      arrows={arrows}
      customTransition='transform 0.8s ease-in-out'
      containerClass='min-h-80 pt-4 pb-10'
      itemClass='px-1.5'
      dotListClass='[&>.react-multi-carousel-dot--active>button]:bg-light-yellow'
    >
      {children}
    </Carousel>
  );
}
