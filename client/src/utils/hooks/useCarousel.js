import { useState } from 'react';

const useCarousel = () => {
  const [width, setWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // currentSlide를 기준으로 carousel-slides 요소를 이동시킨다.
  const move = (_currentSlide, _duration = 0) => {
    // _duration이 0이 아니면 transition이 시작된다. isMoving은 transionend 이벤트가 발생하면 false가 된다.
    if (_duration) setIsMoving(true);
    setCurrentSlide(_currentSlide);
    setDuration(_duration);
  };

  return {
    width,
    currentSlide,
    duration,
    isMoving,
    setWidth,
    setIsMoving,
    move,
  };
};

export default useCarousel;
