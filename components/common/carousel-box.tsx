'use client';

import { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
    breakpoint: { max: 3000, min: 1500 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1500, min: 0 },
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
