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

/**
 * Possible stored user color settings
 */
export enum ColorSetting {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

/**
 *  Possible MUI theme modes
 */
export enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}

// key for caching user color preference in localStorage
export const STORAGE_COLOR_PREFERENCE_KEY = 'colorMode';

// Extend the interface, add neutral color with same color options as the primary palette.
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    link: Palette['primary'];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    link: Palette['primary'];
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: any;
  }
}

// Color declarations:
// Primary
const GordonBlue = '#014983';
const GordonBlue_opacity50 = '#01498382';

// Secondary
const ScottieCyan = '#00AEEF';
const ScottieCyan_opacity75 = '#00AEEFBF';
const ScottieCyan_opacity10 = '#00AEEF1A';

// Error
//Not an official gordon color anymore, we can consider changing this, it is a good error color
const OldSchemeRed = '#B53228';
const NauticalRed = '#FF5D53';

// Success
const LaVidaGreen = '#006D22';
const OldSchemeGreen = '#B2BB1C';
const SeaSpray = '#C7EFCF';

// Warning
const BarringtonGold = '#FDB913';

// Info
const SnowDay = '#D5F0FE';
const NightMarsh = '#023947';
const NightMarsh_opacity50 = '#02394782';
const Athletics = '#081F2C';

// Neutral
const BackgroundLightGray = '#EBEAEA';
const LightGray = '#CCCCCB';

// Contrast
const Black = '#000000';
const White = '#FFFFFF';
const Black_opacity50 = '#00000080';
const Black_opacity20 = '#00000033';
const Black_opacity10 = '#0000001a';

// Dev Tool coloring - Colors for development and testing purposes only
// These colors can be used to test palette colors with an obvious visual indicator of which colors
// have been updated on screen.
const TestTool = '#FF8400'; // devTool orange
const TestToolContrast = '#FF0000'; // devTool red
const TestToolHalfOpacity = '#FF840082'; // devTool orange half opacity
const Placeholder = '#00ff00'; // For unused slots that can be filled with new colors

// Dark Mode Colors!:
const Gray = '#282828';
const DarkGray = '#151515';
const LinkBlue = '#0260ad';

// Theme to use in the CSS vars provider, allowing multiple theme modes
// This theme can be imported in javascript to reference colors directly
export const theme360 = extendTheme({
  typography: {
    fontFamily: '"Gotham SSm 4r", "Gotham SSm A", "Gotham SSm B", sans-serif'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: GordonBlue,
          contrastText: White,
          50: GordonBlue_opacity50,
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
          dark: ScottieCyan_opacity75,
          contrastText: White,
          50: ScottieCyan_opacity10,
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
        info: { main: NightMarsh, light: SnowDay, dark: Athletics, contrastText: White },
        neutral: {
          main: BackgroundLightGray, //currently $neutral-light-gray in _vars
          dark: LightGray, //currently $neutral-gray2
          light: White, //currently $neutral-white
          contrastText: Black,
          50: '#FAF9F9', //Neutral hues must be flipped in dark mode for proper contrast text
          100: '#F4F3F3',
          200: '#EBEAEA',
          300: '#DCDBDB',
          400: '#B8B7B7',
          500: '#989797',
          600: '#706F6F',
          700: '#5C5B5B',
          800: '#3D3D3D',
          900: '#1D1C1C',
          A100: Black,
          A200: Black_opacity50,
          A400: Black_opacity20,
          A700: Black_opacity10,
        },
        link: {
          main: GordonBlue,
          light: ScottieCyan,
          dark: Placeholder,
          contrastText: ScottieCyan,
        },
      },
    },
    dark: {
      // Palette for dark theme mode ------------------------TEMPORARY-COLORS---------------
      palette: {
        // Variables to set various MUI components, may or may not use, but good to have the
        // customizeability
        AppBar: {
          darkBg: NightMarsh,
        },
        background: {
          paper: DarkGray, // Card Colors
        },
        text: {
          primary: White, // Various MUI components and text
        },
        // May be used later, gives us the flexibility to change switch colors when switched off
        // if needed for dark mode.
        // Switch: {
        //   defaultColor: Placeholder, // switch ball off color
        // },
        // common: {
        //   onBackground: Placeholder, // switch track off color
        // },
        action: {
          active: White, // Various icons, especially in PersonalInfo
        },

        // May be used later, gives us the flexibility to change tooltip colors if needed for dark
        // mode.
        // Tooltip: {
        //   bg: Placeholder, // Tooltip background color
        // },
        primary: {
          main: NightMarsh,
          dark: NightMarsh_opacity50,
          contrastText: White,
          50: GordonBlue_opacity50, //should be half opacity of main
        },
        secondary: {
          main: GordonBlue,
          contrastText: White,
          50: GordonBlue_opacity50,
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
        info: { main: NightMarsh, light: SnowDay, dark: Athletics, contrastText: White },
        neutral: {
          main: DarkGray,
          dark: Athletics,
          light: Gray,
          contrastText: White,
          50: '#000000',
          100: '#1D1C1C',
          200: '#353535',
          300: '#5C5B5B',
          400: '#706F6F',
          500: '#989797',
          600: '#B8B7B7',
          700: '#DCDBDB',
          800: '#EBEAEA',
          900: '#F4F3F3',
          A100: '#FAF9F9',
        },
        link: {
          main: LinkBlue,
          light: ScottieCyan,
          dark: Placeholder,
          contrastText: ScottieCyan,
        },
      },
    },
  },
});
