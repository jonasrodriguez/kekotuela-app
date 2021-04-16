import React from "react";
import PropTypes from "prop-types";
import { MuiPickersUtilsProvider, DatePicker as DPicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import { withTheme, MuiThemeProvider, createMuiTheme } from "@material-ui/core";

function DatePicker(props) {
  const { label, value, onChange } = props;
  return (
    <MuiThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>  
        <DPicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          inputVariant="outlined"
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};

export default withTheme(DatePicker);
