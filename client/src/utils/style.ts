import theme from 'styles/theme';

const { colors, fonts, paddings, margins } = theme;

export const handleHoverColorType = (shape: string) => {
  switch (shape) {
    case 'edit':
      return colors.green;
    case 'delete':
      return colors.red;
    case 'circle':
      return colors.blue;
    case 'checked-circle':
      return colors.blue;
    case 'checked-star':
      return colors.yellow;
    case 'checked-like':
      return colors.red;
    case 'confirm':
      return colors.blue;
    default:
      return;
  }
};

export const handleColorType = (color: string | undefined) => {
  switch (color) {
    case 'primary':
      return colors.primary.base;
    case 'primary-dark':
      return colors.primary.dark;
    case 'primary-light':
      return colors.primary.light;
    case 'secondary':
      return colors.secondary.base;
    case 'secondary-dark':
      return colors.secondary.dark;
    case 'secondary-light':
      return colors.secondary.light;
    case 'gray':
      return colors.gray.base;
    case 'gray-dark':
      return colors.gray.dark;
    case 'gray-light':
      return colors.gray.light;
    case 'red':
      return colors.red;
    case 'orange':
      return colors.orange;
    case 'yellow':
      return colors.yellow;
    case 'green':
      return colors.green;
    case 'blue':
      return colors.blue;
    case 'pink':
      return colors.pink;
    case 'purple':
      return colors.purple;
    case 'white':
      return colors.white;
    default:
      return colors.gray.dark;
  }
};

export const handleFontSize = (size: string | undefined) => {
  switch (size) {
    case 'sm':
      return fonts.size.sm;
    case 'base':
      return fonts.size.base;
    case 'lg':
      return fonts.size.lg;
    case 'xl':
      return fonts.size.xl;
    default:
      return fonts.size.base;
  }
};

export const handlePaddingSize = (size: string | undefined) => {
  switch (size) {
    case 'sm':
      return paddings.sm;
    case 'base':
      return paddings.base;
    case 'lg':
      return paddings.lg;
    case 'xl':
      return paddings.xl;
    default:
      return paddings.base;
  }
};

export const handleMarginSize = (size: string | undefined) => {
  switch (size) {
    case 'sm':
      return margins.sm;
    case 'base':
      return margins.base;
    case 'lg':
      return margins.lg;
    case 'xl':
      return margins.xl;
    default:
      return margins.base;
  }
};
