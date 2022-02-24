import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StyledSliderWrapper } from './Carousel.styled';

export type StyledCarouselWrapperProps = {
  width?: string;
  toolColor?: string;
  slidesToShow?: number;
};

type CarouselProps = StyledCarouselWrapperProps & {
  children: React.ReactNode;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
  centerMode?: boolean;
};

const Carousel = ({
  children,
  autoplay = false,
  speed = 500,
  loop = true,
  slidesToShow = 1,
  centerMode = true,
  width,
  toolColor,
}: CarouselProps) => {
  const settigs = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed,
      slidesToShow,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
      centerMode,
    }),
    [autoplay, centerMode, loop, slidesToShow, speed]
  );

  return (
    <StyledSliderWrapper
      width={width}
      slidesToShow={slidesToShow}
      toolColor={toolColor}>
      <Slider {...settigs}>{children}</Slider>
    </StyledSliderWrapper>
  );
};

export default Carousel;
