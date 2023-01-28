import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    text: {
      primary: '#212121',
      secondary: '#9B9FAA',
    },
    primary: {
      main: '#FC842D',
      contrastText: '#FFFFFF',
    },
    divider: '#9B9FAA',
  },
  typography: {
    fontFamily: 'Verdana',
    fontSize: 14,
    h1: {
      color: '#212121',
      fontWeight: 700,
      fontSize: 18,
    },
    button: {
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0,04em',
      textTransform: 'none',
    },
    caption: {
      fontSize: 14,
      fontWeight: 700,
      color: '#9B9FAA',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1280,
      lg: 1280,
      xl: 1280,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#9B9FAA',
          fontSize: 14,
          fontWeight: 700,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-root:before': {
            borderBottom: '1px solid #E0E0E0',
          },
          '& .MuiFormHelperText-root': {
            fontWeight: 400,
            fontSize: 12,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          minWidth: '180px',
          borderRadius: '30px',
          padding: '11px 25px',
        },
      },
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    text: {
      primary: '#FFFFFF',
      secondary: '#9B9FAA',
    },
    primary: {
      main: '#FC842D',
      contrastText: '#FFFFFF',
    },
    divider: '#9B9FAA',
  },
  typography: {
    fontFamily: 'Verdana',
    fontSize: 14,
    h1: {
      color: '#212121',
      fontWeight: 700,
      fontSize: 18,
    },
    button: {
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0,04em',
      textTransform: 'none',
    },
    caption: {
      fontSize: 14,
      fontWeight: 700,
      color: '#9B9FAA',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1280,
      lg: 1280,
      xl: 1280,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#9B9FAA',
          fontSize: 14,
          fontWeight: 700,
          '&.Mui-error': {
            color: '#d17878',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-root:before': {
            borderBottom: '1px solid #E0E0E0',
          },
          '& .MuiInput-root.Mui-error:before': {
            borderBottom: '1px solid #d17878',
          },
          '& .MuiFormHelperText-root': {
            fontWeight: 400,
            fontSize: 12,
            '&.Mui-error': {
              color: '#d17878',
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          minWidth: '180px',
          borderRadius: '30px',
          padding: '11px 25px',
        },
      },
    },
  },
});
