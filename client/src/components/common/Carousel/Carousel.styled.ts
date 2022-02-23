import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { Button } from '..';
import { CarouselButtonProps, CarouselItemProps } from './Carousel';

export const StyledCarouselWrapper = styled.div`
  width: 100%;
  position: relative;
  ${theme.flexes.row('center')}
`;

interface StyledCarouselProps {
  width?: number;
}

export const StyledCarousel = styled.div<StyledCarouselProps>`
  width: 90%;
`;

interface StyledCarouselUlProps {
  duration: number;
  currentSlide: number;
}

export const StyledCarouselUl = styled.ul<StyledCarouselUlProps>`
  overflow: hidden;
  ${theme.flexes.row('center')}

  transition: transform ${({ duration }) => duration};
  transform: translate3d(calc(var(--currentSlide) * 100%), 0, 0);
  transform: translate3d(${({ currentSlide }) => currentSlide * -100}%, 0);
`;

export const StyledCarouselItem = styled.li<CarouselItemProps>`
  width: 300px;
  margin: 1em;
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

  ${({ direction }) =>
    direction === 'prev'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;
