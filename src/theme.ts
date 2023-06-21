import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Colors from http://www.gordon.edu/brandstandards
// Shades from https://goo.gl/AF45tZ

// Deprecated GordonColors, deprecated by Theme Palette update
// Delete once no longer used!
export const gordonColors = {
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

// Extend the interface, add neutral color with same color options as the primary palette.
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

// Seems to be unused with theme palette update, 6/21/2023
// declare module '@mui/material' {
//   interface ButtonPropsColorOverrides {
//     neutral: any;
//   }
// }

// Color declarations:
// Primary
let GordonBlue = '#014983';
let GordonBlueHalfOpacity = '#01498382';

// Secondary
let ScottieCyan = '#00AEEF';

// Error
//Not an official gordon color anymore, we can consider changing this, it is a good error color
let OldSchemeRed = '#B53228';
let NauticalRed = '#ff5d53';

// Success
let LaVidaGreen = '#006d22';
let OldSchemeGreen = '#B2BB1C';
let SeaSpray = '#C7EFCF';

// Warning
let BarringtonGold = '#FDB913';

// Info
let SnowDay = '#D5F0FE';
let NightMarsh = '#023947';

// Neutral
let BackgroundLightGray = '#EBEAEA';
let LightGray = '#CCCCCB';

// Contrast
let Black = '#000000';
let White = '#FFFFFF';

// Dev Tool coloring - Colors for development and testing purposes
let TestTool = '#FF8400';
let TestToolContrast = '#FF0000';

// Theme to use in the CSS vars provider, allowing multiple theme modes
export const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: GordonBlue,
          contrastText: White,
          50: GordonBlueHalfOpacity,
          100: '#BBDDF0',
          200: '#92C8E6',
          300: '#6BB2DC',
          400: '#4EA2D7',
          500: '#3394D1',
          600: '#2886C5',
          700: '#1C75B3',
          800: '#1365A2',
          900: '#014883',
        },
        secondary: {
          main: ScottieCyan,
          contrastText: White,
          50: '#E0F4FD',
          100: '#B0E2F9',
          200: '#7BD0F5',
          300: '#43BDF1',
          400: '#00AFEF',
          500: '#00A1EC',
          600: '#009FDE',
          700: '#0081CA',
          800: '#0070B6',
          900: '#005195',
        },
        error: {
          main: OldSchemeRed,
          light: NauticalRed,
          contrastText: White,
        },
        success: {
          dark: LaVidaGreen,
          main: OldSchemeGreen,
          light: SeaSpray,
        },
        warning: { main: BarringtonGold, dark: OldSchemeRed },
        info: { main: SnowDay, dark: NightMarsh },
        neutral: {
          main: BackgroundLightGray /* page background and contrast light grey */, //currently $neutral-light-gray in _vars
          dark: LightGray /* light gray */, //currently $neutral-gray2
          light: White, //currently $neutral-white
          contrastText: Black /* black */,
          50: '#FAF9F9', //Hues need to be flipped in dark mode for contrasting text to look right
          100: '#F4F3F3',
          200: '#EBEAEA',
          300: '#DCDBDB',
          400: '#B8B7B7',
          500: '#989797',
          600: '#706F6F',
          700: '#5C5B5B',
          800: '#3D3D3D',
          900: '#1D1C1C',
          A100: '#000000',
        },
      },
    },
    dark: {
      // Palette for dark theme mode -------------------------------------------------------
      palette: {
        background: {
          paper: TestTool,
        },
        text: {
          primary: TestToolContrast,
        },
        primary: {
          main: TestTool,
          contrastText: TestTool,
          50: TestTool,
          100: TestTool,
          200: TestTool,
          300: TestTool,
          400: TestTool,
          500: TestTool,
          600: TestTool,
          700: TestTool,
          800: TestTool,
          900: TestTool,
        },
        secondary: {
          main: TestTool,
          contrastText: TestTool,
          50: TestTool,
          100: TestTool,
          200: TestTool,
          300: TestTool,
          400: TestTool,
          500: TestTool,
          600: TestTool,
          700: TestTool,
          800: TestTool,
          900: TestTool,
        },
        error: {
          main: TestTool,
          light: TestTool,
          contrastText: TestTool,
        },
        success: {
          dark: TestTool,
          main: TestTool,
          light: TestTool,
        },
        warning: { main: TestTool, dark: TestTool },
        info: { main: TestTool },
        neutral: {
          main: TestTool,
          dark: TestTool,
          light: TestTool,
          contrastText: TestToolContrast,
          50: TestTool,
          100: TestTool,
          200: TestTool,
          300: TestTool,
          400: TestTool,
          500: TestTool,
          600: TestTool,
          700: TestTool,
          800: TestTool,
          900: TestTool,
          A100: TestTool,
        },
      },
    },
  },
});
