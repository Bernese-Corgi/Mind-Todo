import { useState } from 'react';

const useCarousel = () => {
  const [width, setWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const move = (_currentSlide, _duration = 0) => {
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
