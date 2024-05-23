import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Colors from http://www.gordon.edu/brandstandards

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

// Color declarations for simplified naming:
// Primary
const GordonBlue = '#014983';
const GordonBlue_opacity50 = '#01498382';

// Secondary
const ScottieCyan = '#00AEEF';
const ScottieCyan_opacity75 = '#00AEEFBF';
const ScottieCyan_opacity10 = '#00AEEF1A';

// Error
//Red used in the old color scheme, good error color
const ChristmasRed = '#B53228';
const NauticalRed = '#FF5D53';
const DarkRed = '#430f0b';

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

const Placeholder = '#00ff00'; // For unused theme slots that can be filled with new colors

// Dark Mode Colors!:
const Gray = '#282828';
const DarkGray = '#151515';
const LinkBlue = '#0260ad';

// Theme to use in the CSS vars provider, allowing multiple theme modes
// This theme can be imported in javascript to reference colors directly
// See documentation in the docs directory for more information!
export const theme360 = extendTheme({
  colorSchemes: {
    // Palette for light theme mode
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
          contrastText: Black,
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
          main: ChristmasRed,
          light: NauticalRed,
          contrastText: White,
        },
        success: {
          dark: LaVidaGreen,
          main: OldSchemeGreen,
          light: SeaSpray,
        },
        warning: { main: BarringtonGold, dark: ChristmasRed },
        info: { main: NightMarsh, light: SnowDay, dark: Athletics, contrastText: White },
        neutral: {
          main: BackgroundLightGray,
          dark: LightGray,
          light: White,
          contrastText: Black,
          50: '#FAF9F9',
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
        Alert: {
          errorStandardBg: NauticalRed,
          errorColor: Black,
          errorIconColor: Black,
        },
      },
    },
    dark: {
      // Palette for dark theme mode
      palette: {
        // Variables to set various MUI components, helpful for future customizeability
        AppBar: {
          darkBg: NightMarsh,
        },
        background: {
          paper: DarkGray, // Card Colors
        },
        text: {
          primary: White, // Various MUI components and text
        },
        action: {
          active: White, // Various icons, especially in PersonalInfo on the profile
        },
        // May be used later, gives us the flexibility to change switch colors when switched off
        // if needed for dark mode.
        // Switch: {
        //   defaultColor: Placeholder, // switch ball off color
        // },
        // common: {
        //   onBackground: Placeholder, // switch track off color
        // },
        // May be used later, gives us the flexibility to change tooltip colors if needed for dark
        // mode.
        // Tooltip: {

        //   bg: Placeholder, // Tooltip background color
        // },
        primary: {
          main: NightMarsh,
          dark: NightMarsh_opacity50,
          contrastText: White,
          50: NightMarsh_opacity50, //should be half opacity of main
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
          main: NauticalRed,
          light: ChristmasRed,
          contrastText: White,
        },
        success: {
          dark: LaVidaGreen,
          main: OldSchemeGreen,
          light: SeaSpray,
        },
        warning: { main: BarringtonGold, dark: ChristmasRed },
        info: { main: NightMarsh, light: SnowDay, dark: Athletics, contrastText: White },
        neutral: {
          main: DarkGray,
          dark: Athletics,
          light: Gray,
          contrastText: White,
          50: '#1D1C1C',
          100: '#353535',
          200: '#5C5B5B',
          300: '#706F6F',
          400: '#989797',
          500: '#B8B7B7',
          600: '#DCDBDB',
          700: '#EBEAEA',
          800: '#F4F3F3',
          900: '#FAF9F9',
          A100: White,
        },
        link: {
          main: LinkBlue,
          light: ScottieCyan,
          dark: Placeholder,
          contrastText: ScottieCyan,
        },
        Alert: {
          errorColor: NauticalRed,
          errorIconColor: NauticalRed,
          errorStandardBg: DarkRed,
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: ({ theme }) => ({
          '[data-mui-color-scheme="dark"] &': {
            color: theme.vars.palette.neutral.contrastText,
            borderColor: theme.vars.palette.neutral.contrastText,
          },
        }),
      },
    },
  },
});

// Material-UI breakpoints. This is to allow components to use Material-UI's breakpoints since
// you cannot import variables from a vars.scss to a JS file.
export const windowBreakWidths = {
  breakXS: 0,
  breakSM: 600,
  breakMD: 900,
  breakLG: 1200,
  breakXL: 1536,
} as const;

// key for caching user color preference in localStorage
export const STORAGE_COLOR_PREFERENCE_KEY = 'colorMode';

/**
 * Stored user color settings, possible options in localstorage
 */
export enum ColorSetting {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

/**
 *  MUI theme modes, possible theme modes
 */
export enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}
