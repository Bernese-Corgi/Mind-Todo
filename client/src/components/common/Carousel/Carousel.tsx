import React, { useEffect, useRef, useState } from 'react';
import { StyledCarousel, StyledCarouselItem } from './Carousel.styled';

interface CarouselProps {}

export type StyledCarouselItemProps = {
  prev;
  next;
  active;
};

type CarouselItemProps = StyledCarouselItemProps & {
  src;
};

const Item = ({ src, prev, next, active }: CarouselItemProps) => {
  return (
    <StyledCarouselItem
      src={src}
      active={active}
      prev={prev}
      next={next}></StyledCarouselItem>
  );
};

const Carousel = ({}: CarouselProps) => {
  return <></>;
};

export default Carousel;
