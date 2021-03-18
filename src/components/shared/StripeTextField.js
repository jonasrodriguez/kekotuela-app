import React from "react";
import { TextField, withTheme } from "@material-ui/core";

function StripeTextField(props) {
  const { label, value, setValue } = props;

  return (
    <TextField
      variant="outlined"
      margin="none"
      required
      label={label}
      value={value}
      fullWidth
      autoFocus
      autoComplete="off"
      type="text"
      onChange={event => {
        setValue(event.target.value);
      }}
    />
  );
}

export default withTheme(StripeTextField);
