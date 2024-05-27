// src/theme.ts
import { extendTheme } from '@chakra-ui/react';
import { buttonStyles, inputStyles, selectStyles } from './components';
import { colors, fonts } from './theme';

const componentStyles = {
  Button: buttonStyles,
  Input: inputStyles,
  Select: selectStyles,
};

const theme = extendTheme({
  components: componentStyles,
  fonts: fonts,
  colors: colors,
});

console.log('Theme: ', theme);

export default theme;
