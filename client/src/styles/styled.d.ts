import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        base: string;
        light: string;
        dark: string;
      };
      secondary: {
        base: string;
        light: string;
        dark: string;
      };
      gray: {
        base: string;
        light: string;
        dark: string;
      };
      white: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
      pink: string;
      rainbow: array;
    };
    fonts: {
      family: {
        base: string;
        title: string;
      };
      size: {
        sm: string;
        base: string;
        lg: string;
        xl: string;
        title: string;
      };
      weight: {
        light: number;
        normal: number;
        bold: number;
      };
    };
    margins: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
    paddings: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
    boxShadow: {
      default: string;
    };
    borders: {
      radius: {
        round: string;
        square: string;
      };
    };
    flexes: {
      mixin: (direction: string, align: string, justify: string) => string;
      center: string;
      row: (justify: string) => string;
      column: (justify: string) => string;
    };
    positions: {
      absolute: {
        topLeft: string;
        center: string;
      };
    };
    sizes: {
      [key: string]: number;
    };
    media: {
      mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
      tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
      desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
    };
  }
}
