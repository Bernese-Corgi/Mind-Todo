import styled from 'styled-components';
import theme from 'styles/theme';
import { StyledCarouselWrapperProps } from './Carousel';

const setColor = (toolColor: string | undefined) =>
  toolColor || theme.colors.primary.base;

export const StyledSliderWrapper = styled.section<StyledCarouselWrapperProps>`
  width: ${({ width }) => width};

  /* slide */
  .slick-slide {
    padding: 2em ${({ slidesToShow }) => slidesToShow && 4 / slidesToShow}em;
  }

  /* parent */
  .slick-list {
    margin: 0 2.3em;
  }

  /* centerMode */
  .slick-center {
    transform: scale(1.1);
  }

  /* buttons */
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }

  .slick-prev:before,
  .slick-next:before {
    color: ${({ toolColor }) => setColor(toolColor)};
    ${theme.transition()}
  }

  /* dots */
  .slick-dots {
    button:before {
      color: ${({ toolColor }) => setColor(toolColor)};
    }

    .slick-active {
      button:before {
        color: ${({ toolColor }) => setColor(toolColor)};
      }
    }
  }
`;
