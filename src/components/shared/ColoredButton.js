import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";

function ColoredButton(props) {
  const { color, children, theme } = props;
  const buttonTheme = createMuiTheme({
    ...theme,
    palette: {
      primary: {
        main: color
      }
    }
  });
  const buttonProps = (({ color, theme, children, ...o }) => o)(props);
  return (
    <ThemeProvider theme={buttonTheme}>
      <Button {...buttonProps} color="primary">
        {children}
      </Button>
    </ThemeProvider>
  );
}

ColoredButton.propTypes = {
  color: PropTypes.string.isRequired
};

export default memo(ColoredButton);
