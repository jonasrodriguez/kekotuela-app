import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Toolbar, Button, TextField, Typography, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  title: {
    flexGrow: 1,
  },
};

function SectionHeader(props) {
  const { classes, title, searchFunc, buttonText, buttonFunc } = props;  

  return (
    <Toolbar className={classes.appbar}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>    
      <TextField type="search" variant="standard" 
        onChange={ev => {searchFunc(ev.target.value.toLowerCase())}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={buttonFunc}>
        {buttonText}
      </Button>
    </Toolbar>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired,
  buttonFunc: PropTypes.func.isRequired,
};

export default withStyles(styles)(SectionHeader);
