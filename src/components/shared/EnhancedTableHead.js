import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Typography, TableCell, TableHead, TableRow, TableSortLabel, withStyles } from "@material-ui/core";

const styles = theme => ({
  tableSortLabel: {
    cursor: "text",
    userSelect: "auto",
    color: "inherit !important"
  },
  noIcon: {
    "& path": {
      display: "none !important"
    }
  },
  paddingFix: {
    paddingLeft: theme.spacing(3)
  }
});

function EnhancedTableHead(props) {
  const { rows, classes } = props;

  return (
    <TableHead>
      <TableRow>
        {rows.map((row, index) => (
          <TableCell
            key={index}
            align={row.numeric ? "right" : "inherit"}
            padding="default"
            className={index === 0 ? classes.paddingFix : null}
          >            
            <TableSortLabel className={classNames(classes.tableSortLabel, classes.noIcon)}>
              <Typography variant="subtitle2" className={classes.label}>
                {row.label}
              </Typography>
            </TableSortLabel>            
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles, { withTheme: true })(EnhancedTableHead);
