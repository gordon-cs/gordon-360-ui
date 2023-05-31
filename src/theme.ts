import { createTheme } from '@mui/material/styles';

let dark = false;

if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    dark = true;
  }
}

// Colors from http://www.gordon.edu/brandstandards
// Shades from https://goo.gl/AF45tZ
export const gordonColors = dark ? {
  primary: {
    blue: '#014983',
    blueShades: {
      50: '#8fcdfe',
      100: '#43aafe',
      200: '#0b91fd',
      300: '#016bc0',
      400: '#015aa1',
      500: '#014983',
      600: '#013865',
      700: '#012746',
      800: '#001628',
      900: '#00050a',
      A100: '#84c8ff',
      A200: '#1e9bff',
      A400: '#0065b7',
      A700: '#00579d',
      contrastDefaultColor: 'light',
    },
    cyan: '#00AEEF',
    cyanShades: {
      50: '#f9fdff',
      100: '#ade9ff',
      200: '#75d9ff',
      300: '#2dc6ff',
      400: '#0fbeff',
      500: '#00aeef',
      600: '#0098d0',
      700: '#0081b2',
      800: '#006b93',
      900: '#005575',
      A100: '#effbff',
      A200: '#89dfff',
      A400: '#23c3ff',
      A700: '#09bcff',
      contrastDefaultColor: 'light',
    },
  },
  secondary: {
    green: '#B2BB1C',
    greenShades: {
      main: '#B2BB1C',
      secondary: '#009900',
    },
    yellow: '#FDB913',
    yellowShades: {
      main: '#FDB913',
    },
    orange: '#DE571F',
    red: '#B53228',
    redShades: {
      50: '#fbedeb',
      100: '#edb1ad',
      200: '#e3867f',
      300: '#d64f44',
      400: '#ce392e',
      500: '#b53228',
      600: '#9c2b22',
      700: '#83241d',
      800: '#6a1d17',
      900: '#511612',
      A100: '#fee0de',
      A200: '#fb847b',
      A400: '#e6382a',
      A700: '#d03226',
      contrastDefaultColor: 'light',
    },
  },
  neutral: {
    main: '#333334',
    dark: '#333334',
    cardColor: '#333334',
    contrastText: 'rgba(255, 255, 255, 0.9)',
    lightGray: '#141515',
    gray: '#333334',
    grayShades: {
      50: '#000000',
      100: '#000000',
      200: '#000000',
      300: '#151515',
      400: '#242425',
      500: '#333334',
      600: '#424243',
      700: '#515153',
      800: '#606062',
      900: '#707072',
      A100: '#000000',
      A200: '#000000',
      A400: '#16161e',
      A700: '#242429',
      contrastDefaultColor: 'light',
    },
    darkGray: '#CECBD4',
  },
} as const : {
  primary: {
    blue: '#014983',
    blueShades: {
      50: '#8fcdfe',
      100: '#43aafe',
      200: '#0b91fd',
      300: '#016bc0',
      400: '#015aa1',
      500: '#014983',
      600: '#013865',
      700: '#012746',
      800: '#001628',
      900: '#00050a',
      A100: '#84c8ff',
      A200: '#1e9bff',
      A400: '#0065b7',
      A700: '#00579d',
      contrastDefaultColor: 'light',
    },
    cyan: '#00AEEF',
    cyanShades: {
      50: '#f9fdff',
      100: '#ade9ff',
      200: '#75d9ff',
      300: '#2dc6ff',
      400: '#0fbeff',
      500: '#00aeef',
      600: '#0098d0',
      700: '#0081b2',
      800: '#006b93',
      900: '#005575',
      A100: '#effbff',
      A200: '#89dfff',
      A400: '#23c3ff',
      A700: '#09bcff',
      contrastDefaultColor: 'light',
    },
  },
  secondary: {
    green: '#B2BB1C',
    greenShades: {
      main: '#B2BB1C',
      secondary: '#009900',
    },
    yellow: '#FDB913',
    yellowShades: {
      main: '#FDB913',
    },
    orange: '#DE571F',
    red: '#B53228',
    redShades: {
      50: '#fbedeb',
      100: '#edb1ad',
      200: '#e3867f',
      300: '#d64f44',
      400: '#ce392e',
      500: '#b53228',
      600: '#9c2b22',
      700: '#83241d',
      800: '#6a1d17',
      900: '#511612',
      A100: '#fee0de',
      A200: '#fb847b',
      A400: '#e6382a',
      A700: '#d03226',
      contrastDefaultColor: 'light',
    },
  },
  neutral: {
    main: '#EBEAEA',
    dark: '#CCCCCB',
    cardColor: '#ffffff',
    contrastText: 'rgba(0, 0, 0, 0.87)',
    lightGray: '#EBEAEA',
    gray: '#CCCCCB',
    grayShades: {
      50: '#ffffff',
      100: '#ffffff',
      200: '#ffffff',
      300: '#eaeaea',
      400: '#dbdbda',
      500: '#cccccb',
      600: '#bdbdbc',
      700: '#aeaeac',
      800: '#9f9f9d',
      900: '#8f8f8d',
      A100: '#ffffff',
      A200: '#ffffff',
      A400: '#e9e9e1',
      A700: '#dbdbd6',
      contrastDefaultColor: 'dark',
    },
    darkGray: '#31342B',
  },
} as const;

// Material-UI breakpoints. This is to allow components to use Material-UI's breakpoints since
// you cannot import variables from a vars.scss to a JS file.
export const windowBreakWidths = {
  breakXS: 0,
  breakSM: 600,
  breakMD: 900,
  breakLG: 1200,
  breakXL: 1536,
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: any;
  }
}

const theme = createTheme({
  palette: {
    primary: gordonColors.primary.blueShades,
    secondary: gordonColors.primary.cyanShades,
    error: gordonColors.secondary.redShades,
    success: gordonColors.secondary.greenShades,
    warning: gordonColors.secondary.yellowShades,
    info: gordonColors.primary.cyanShades,
    neutral: gordonColors.neutral,
  },
  typography: {
    fontFamily: ['Gotham SSm 7r', 'Gotham SSm A', 'Gotham SSm B', 'sans-serif'].join(','),
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: gordonColors.neutral.darkGray,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: gordonColors.neutral.grayShades.A100,
        },
        containedSecondary: {
          color: gordonColors.neutral.grayShades.A100,
        },
      },
    },
  },
});

export default theme;
