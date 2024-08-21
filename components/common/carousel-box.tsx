'use client';

import { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SkeletonBox from './skeleton-box';

type ResponsiveSetting = {
  breakpoint: { max: number; min: number };
  items: number;
};

type Responsive = {
  desktop?: ResponsiveSetting;
  tablet?: ResponsiveSetting;
  mobile?: ResponsiveSetting;
};

interface Props {
  children: ReactNode;
  responsive?: Responsive;
  config: {
    centerMode: boolean;
    showDots?: boolean;
    swipeable?: boolean;
    infinite?: boolean;
    autoPlay?: boolean;
    arrows?: boolean;
  };
  containerClass?: string;
  itemClass?: string;
}

const defaultResponsive: Responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1023, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export default function CarouselBox({
  children,
  config,
  responsive,
  containerClass,
  itemClass,
}: Props) {
  const {
    centerMode,
    showDots = true,
    swipeable = true,
    infinite = true,
    autoPlay = false,
    arrows = true,
  } = config;

  return (
    <Carousel
      ssr={false}
      responsive={responsive || defaultResponsive}
      infinite={infinite}
      autoPlay={autoPlay}
      swipeable={swipeable}
      showDots={showDots}
      centerMode={centerMode}
      arrows={arrows}
      customTransition='transform 0.8s ease-in-out'
      containerClass={containerClass}
      itemClass={itemClass}
      dotListClass='[&>.react-multi-carousel-dot--active>button]:bg-light-yellow'
    >
      {children}
    </Carousel>
  );
}
