import React from "react";
import PropTypes from "prop-types";
import { MuiPickersUtilsProvider, DateTimePicker as DTPicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import AccessTime from "@material-ui/icons/AccessTime";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import DateRange from "@material-ui/icons/DateRange";

function DateTimePicker(props) {
  const { label, value, onChange } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>  
      <DTPicker
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        inputVariant="outlined"
        label={label}
        leftArrowIcon={<KeyboardArrowLeft />}
        rightArrowIcon={<KeyboardArrowRight />}
        timeIcon={<AccessTime />}
        dateRangeIcon={<DateRange />}
        variant="outlined"
        value={value}
        onChange={onChange}
        {...props}
        inputProps={{ style: { width: "100%", cursor: "pointer" } }}
      />
    </MuiPickersUtilsProvider>
  );
}

DateTimePicker.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};

export default DateTimePicker;
