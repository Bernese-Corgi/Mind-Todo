import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { Button } from '..';
import { CarouselButtonProps, CarouselItemProps } from './Carousel';

const buttonPadding = '3em';

export const StyledCarouselWrapper = styled.div`
  background-color: tomato;
  width: 100%;
  position: relative;
  margin: 0 auto;
  padding: 1em ${buttonPadding};

  ${({ theme }) => theme.media.desktop`
    width: 30vw;
  `}
  ${({ theme }) => theme.media.tablet`
    width: 40vw;
  `}
  ${({ theme }) => theme.media.mobile`
    width: 80vw;
  `}

  ${theme.flexes.row('center')}
`;

interface StyledCarouselProps {
  width?: number;
}

export const StyledCarousel = styled.div<StyledCarouselProps>`
  width: 100%;
  overflow: hidden;
  background-color: gold;
`;

interface StyledCarouselUlProps {
  duration: number;
  currentSlide: number;
}

export const StyledCarouselUl = styled.ul<StyledCarouselUlProps>`
  ${theme.flexes.row('center')}

  transition: transform ${({ duration }) => duration}ms ease-out;
  /* transform: translate3D(calc(var(--currentSlide) * -100%), 0, 0); */
  transform: translate3D(${({ currentSlide }) => currentSlide * -100}%, 0, 0);
`;

export const StyledCarouselItem = styled.li<CarouselItemProps>`
  /* width: 500px; */
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
  background-color: blue;
  padding: calc(${buttonPadding} / 6);

  ${({ direction }) =>
    direction === 'prev'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;
