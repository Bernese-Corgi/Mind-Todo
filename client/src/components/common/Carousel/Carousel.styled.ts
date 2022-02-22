import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { Button } from '..';
import { CarouselButtonProps, CarouselItemProps } from './Carousel';

export const StyledCarouselItem = styled.div<CarouselItemProps>`
  width: 300px;
`;

interface StyledCarouselProps {
  width?: number;
}

export const StyledCarousel = styled.div<StyledCarouselProps>`
  background-color: slateblue;
  /* width: ${({ width }) => width}px; */
  width: 50%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  /* opacity: ${({ width }) => (width ? 1 : 0)}; ; */
`;

interface StyledCarouselSlidesProps {
  duration: number;
  currentSlide: number;
}

export const StyledCarouselSlides = styled.ul<StyledCarouselSlidesProps>`
  display: flex;
  transition: transform ${({ duration }) => duration};
  transform: translate3d(calc(var(--currentSlide) * 100%), 0, 0);
  transform: translate3d(${({ currentSlide }) => currentSlide * -100}%, 0);
`;

export const StyledCarouselButton = styled(Button).attrs<CarouselButtonProps>(
  ({ direction }) => ({
    shape: direction === 'prev' ? 'down' : 'up',
    color: theme.colors.primary.highSat,
  })
)<CarouselButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  z-index: 99;
  background: rgb(255, 255, 255);

  ${({ direction }) =>
    direction === 'prev'
      ? css`
          left: 0;
          background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 54%,
            rgba(0, 0, 0, 0) 100%
          );
        `
      : css`
          right: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 54%,
            rgba(0, 0, 0, 0) 100%
          );
        `}
`;
