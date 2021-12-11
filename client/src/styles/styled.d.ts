import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        base: string;
        light: string;
        dark: string;
        highSat: string;
        lowSat: string;
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
        xs: string;
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
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
    boxShadow: {
      default: string;
      wide: string;
      narrow: string;
    };
    borders: {
      radius: {
        round: string;
        square: string;
      };
    };
    flexes: {
      mixin: (
        direction: string,
        align: string,
        justify: string,
        wrap?: string
      ) => string;
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
    transition: (sec?: string, timing?: string) => string;
    sizes: {
      [key: string]: number;
    };
    media: {
      mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
      tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
      desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
    };
    defElem: {
      input: (hasBorder?: boolean) => string;
      errInput: string;
      errForm: string;
      divider: (width?: string) => string;
    };
  }
}
