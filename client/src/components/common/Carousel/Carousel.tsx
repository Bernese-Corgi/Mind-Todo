import { MindmapItem } from 'components/mindmaps/MindmapList/MindmapList';
import React, { forwardRef, useEffect, useRef } from 'react';
import useCarousel from 'utils/hooks/useCarousel';
import {
  StyledCarousel,
  StyledCarouselButton,
  StyledCarouselItem,
  StyledCarouselSlides,
} from './Carousel.styled';

interface CarouselProps {
  datas: any[];
}

export type CarouselItemProps = {
  data;
  children;
};

export type CarouselButtonProps = {
  direction: 'prev' | 'next';
};

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ data, children }, ref) => {
    return (
      <StyledCarouselItem data={data} ref={ref}>
        {children}
      </StyledCarouselItem>
    );
  }
);

const Carousel = ({ datas }: CarouselProps) => {
  const {
    width,
    currentSlide,
    duration,
    isMoving,
    setWidth,
    setIsMoving,
    move,
  } = useCarousel();

  const itemRef = useRef<HTMLDivElement>(null);

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
    <StyledCarousel width={width}>
      {/* slides --------------------------------- */}
      <StyledCarouselSlides
        duration={duration}
        currentSlide={currentSlide}
        onTransitionEnd={handleTransitionEnd}>
        {Slides.map((data, i) => (
          // TODO svg일 때, img일 때 다르게..
          // <img key={i} src={url} onLoad={handleLoadItem} alt="" />
          <CarouselItem data={data} ref={itemRef}>
            <MindmapItem mindmap={data} key={i} onLoad={handleLoadItem} />
          </CarouselItem>
        ))}

        {/* {datas} */}
      </StyledCarouselSlides>

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
    </StyledCarousel>
  );
};

export default Carousel;
