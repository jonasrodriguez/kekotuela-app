import { responsiveFontSizes } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    secondary: { main: '#ff0f0f' },
    background: {
      default: "#f5f5f5"
    },
    common: {
      black: '#343a40'
    }
  },
  border: {
    borderColor: 2,
    borderWidth: 'rgba(0, 0, 0, 0.13)',
  },
});

export default responsiveFontSizes(theme);
