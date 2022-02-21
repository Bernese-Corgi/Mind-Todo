import React, { useEffect, useRef, useState } from 'react';
import {
  StyledCarousel,
  StyledCarouselButton,
  StyledCarouselItem,
} from './Carousel.styled';

interface CarouselProps {}

export type CarouselItemProps = {
  prev;
  next;
  active;
  src;
};

export type CarouselButtonProps = {
  direction: 'prev' | 'next';
};

const Carousel = ({}: CarouselProps) => {
  const totalItems = 5;
  const [current, setCurrent] = useState(0);

  const isMoving = useRef(false);

  useEffect(() => {
    isMoving.current = true;

    setTimeout(() => {
      isMoving.current = false;
    }, 500);
  }, [current]);

  const moveNext = () => {
    if (!isMoving.current) {
      current === totalItems - 1 ? setCurrent(0) : setCurrent(current + 1);
    }
  };

  const movePrev = () => {
    if (!isMoving.current) {
      current === 0 ? setCurrent(totalItems - 1) : setCurrent(current - 1);
    }
  };

  const ItemList = Array(totalItems)
    .fill(null)
    .map((_, i) => {
      const key = `item_${i}`;

      const prev = current === 0 ? totalItems - 1 : current - 1;
      const next = current === totalItems - 1 ? 0 : current + 1;

      return (
        <StyledCarouselItem
          src={`https://picsum.photos/id/${i}/1600/900`}
          key={key}
          active={i === current}
          prev={i === prev}
          next={i === next}></StyledCarouselItem>
      );
    });

  return (
    <StyledCarousel>
      {ItemList}
      <StyledCarouselButton
        type="button"
        id="prevItemBtn"
        title="이전 슬라이드"
        direction="prev"
        onClick={movePrev}
      />

      <StyledCarouselButton
        type="button"
        id="nextItemBtn"
        title="다음 슬라이드"
        direction="next"
        onClick={moveNext}
      />
    </StyledCarousel>
  );
};

export default Carousel;
