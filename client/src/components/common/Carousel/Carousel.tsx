import React, { forwardRef, useEffect, useRef } from 'react';
import useCarousel from 'utils/hooks/useCarousel';
import {
  StyledCarouselWrapper,
  StyledCarousel,
  StyledCarouselButton,
  StyledCarouselItem,
  StyledCarouselUl,
} from './Carousel.styled';

interface CarouselProps {
  datas: any[];
  slides?: any;
}

export type CarouselItemProps = {
  children;
};

export type CarouselButtonProps = {
  direction: 'prev' | 'next';
};

const CarouselItem = forwardRef<HTMLLIElement, CarouselItemProps>(
  ({ children }, ref) => {
    return <StyledCarouselItem ref={ref}>{children}</StyledCarouselItem>;
  }
);

const Carousel = ({ datas, slides }: CarouselProps) => {
  const {
    width,
    currentSlide,
    duration,
    isMoving,
    setWidth,
    setIsMoving,
    move,
  } = useCarousel();

  const itemRef = useRef<HTMLLIElement>(null);

  const handleLoadItem = (e: any /* TODO 타입 변경 */) => {
    if (width !== e.target.offsetWidth) setWidth(e.target.offsetWidth);
    move(1);
  };

  useEffect(() => {
    if (!itemRef.current?.offsetWidth) return;

    if (width !== itemRef.current?.offsetWidth)
      setWidth(itemRef.current?.offsetWidth);

    move(1);
  }, [move, setWidth, width]);

  const handleClickPrev = () => {
    if (isMoving) return;
    console.log('first');

    move(currentSlide + 1 * -1, 500);
  };

  const handleClickNext = () => {
    if (isMoving) return;

    move(currentSlide + 1, 500);
  };

  const handleTransitionEnd = () => {
    setIsMoving(false);

    const delta =
      currentSlide === 0 ? 1 : currentSlide === datas.length + 1 ? -1 : 0;

    if (delta) move(currentSlide + datas.length * delta);
  };
  console.log(currentSlide);

  const Slides = [datas[datas.length - 1], ...datas, datas[0]];

  return (
    <StyledCarouselWrapper>
      <StyledCarousel>
        {/* slides --------------------------------- */}
        <StyledCarouselUl
          duration={duration}
          currentSlide={currentSlide}
          onTransitionEnd={handleTransitionEnd}>
          {slides?.map((slide, i) => (
            <CarouselItem>{slide}</CarouselItem>
          ))}
        </StyledCarouselUl>
      </StyledCarousel>

      {/* button --------------------------------- */}
      <StyledCarouselButton
        type="button"
        id="prev"
        title="이전 슬라이드"
        direction="prev"
        onClick={handleClickPrev}
      />
      <StyledCarouselButton
        type="button"
        id="next"
        title="다음 슬라이드"
        direction="next"
        onClick={handleClickNext}
      />
    </StyledCarouselWrapper>
  );
};

export default Carousel;
