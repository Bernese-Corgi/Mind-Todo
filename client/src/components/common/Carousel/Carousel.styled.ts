import styled from 'styled-components';
import theme from 'styles/theme';
import { StyledCarouselItemProps } from './Carousel';

export const StyledCarouselItem = styled.img<StyledCarouselItemProps>`
  opacity: 0;
  ${theme.positions.absolute}
  width: 100%;
  margin: auto;
  padding: 1rem 4rem;
  z-index: 100;
  transition: transform 0.5s, opacity 0.5s, z-index 0.5s;

  transform: ${({ prev }) => (prev ? 'translateX(-100%)' : '')};
  transform: ${({ next }) => (next ? 'translateX(-100%)' : '')};
  z-index: ${({ prev, next }) => (prev || next ? 800 : '')};

  ${({ active }) =>
    active &&
    `
      opacity: 1;
      position: relative;
      z-index: 100;
    `}
`;

export const StyledCarousel = styled.div`
  overflow: hidden;
  width: 90%;
  margin: auto;

  .carousel {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
`;
