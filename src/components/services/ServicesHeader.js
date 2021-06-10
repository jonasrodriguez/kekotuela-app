import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, InputAdornment, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

function ServicesHeader(props) {
  const { title, searchFunc } = props;

  return (
    <Toolbar>
      <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Box>
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
    </Toolbar>    
  );
}

ServicesHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired,
};

export default ServicesHeader;
