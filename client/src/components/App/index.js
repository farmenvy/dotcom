import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator';
import Routes from '../../routes';

const colors = {
  darkestGreen: '#3EB989',
  limeGreen: '#86DEB7',
  seaGreen: '#ADEEE3',
  darkestBlue: '#2E5266',
  blue: '#33658A',
  pinkish: '#EEADAD',
  salmon: '#E18C8C',
  white: '#FFFFFF',
  grey1: '#ECEDEF',
  grey2: '#EBEBEB',
  grey3: '#C6CACF',
  grey4: '#AAAEB3',
  grey5: '#6F7379',
  black: '#202224',
};


const muiTheme = getMuiTheme({
  fontFamily: "'Open Sans', sans-serif",
  palette: {
    primary1Color: colors.blue,
    primary2Color: colors.darkestBlue,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: colors.blue,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  flatButton: {
    fontWeight: 'bold',
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme} >
    <ThemeProvider theme={colors} >
      <Routes />
    </ThemeProvider>
  </MuiThemeProvider>
);

export default App;
