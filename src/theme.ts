import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Colors from http://www.gordon.edu/brandstandards
// Shades from https://goo.gl/AF45tZ
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
    pinkShades: {
      50: '#FFE6F5',
      100: '#FFCDEA',
      200: '#FFB6E1',
      300: '#FFA3D9',
      400: '#FF91D2',
      500: '#FF85CD',
      600: '#FF79C7',
      700: '#FF6EC3',
      800: '#FF5CBB',
      900: '#FF4BB4',
      A100: '#FF47B3',
      A200: '#FF31AA',
      A400: '#FF189F',
      A700: '#F1008D',
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

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    //gordonBlue: PaletteOptions['primary'];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    //gordonBlue: PaletteOptions['primary'];
    // Testing with adding extra colors to the palette, need to learn more about how to use this!
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: any;
  }
}

/*const theme = createTheme({
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
        },<ModeSwitcher />
        containedSecondary: {
          color: gordonColors.neutral.grayShades.A100,
        },
      },
    },
  },
}); */

export const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // gordonBlue: {
        //   // Testing with adding extra colors to the palette!
        //   main: '#014983',
        // },
        primary: {
          main: '#014983' /* Gordon blue */,
          contrastText: '#ffffff' /* white */,
          50: '#E3F1F8',
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
          main: '#00AEEF' /* Scottie Cyan */,
          contrastText: '#FFFFFF' /* white */,
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
          main: '#B53228' /* old scheme red, good error color */,
          light: '#ff5d53', //Nautical Red
          contrastText: '#FFFFFF' /* white */,
        },
        success: {
          dark: '#006d22' /*La Vida Green*/,
          main: '#B2BB1C' /* old scheme green */,
          light: '#C7EFCF' /* Sea Spray */,
        },
        warning: { main: '#FDB913' /*Barrington Gold */, dark: '#DE571F' /* old scheme red */ },
        info: { main: '#D5F0FE' /* Snow Day */ },
        neutral: {
          main: '#EBEAEA' /* page background and contrast light grey */, //currently $neutral-light-gray in _vars
          dark: '#CCCCCB' /* not used */, //currently $neutral-gray2 (not used)
          light: '#FFFFFFF' /* white */, //currently $neutral-white
          contrastText: '#000000' /* black */,
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
        },
      },
    },
    dark: {
      palette: {
        // gordonBlue: {
        //   // Testing with adding extra colors to the palette!
        //   main: '#014983',
        // },
        primary: {
          main: '#FF52F6' /* Gordon blue */,
          contrastText: '#223780' /* white */,
        },
        secondary: {
          main: '#FFF700' /* Scottie Cyan */,
          contrastText: '#00f7ff' /* white */,
        },
        error: {
          main: '#58148F' /* old scheme red, good error color */,
          light: '#A78FBA', //Nautical Red
          contrastText: '#37E660' /* white */,
        },
        success: {
          dark: '#033870' /*La Vida Green*/,
          main: '#398BE3' /* old scheme green */,
          light: '#93B6DB' /* Sea Spray */,
        },
        warning: { main: '#ED6328' /*Barrington Gold */, dark: '#8C3611' /* old scheme red */ },
        info: { main: '#DB0F13' /* Snow Day */ },
        neutral: {
          main: '#023947' /* page background and contrast light grey */, //currently $neutral-light-gray in _vars
          dark: '#000000' /* not used */, //currently $neutral-gray2 (not used)
          light: '#20B1D6' /* white */, //currently $neutral-white
          contrastText: '#ffffff' /* black */,
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
        },
      },
    },
  },
});
