import React from "react";
import PropTypes from "prop-types";
import { TablePagination, withStyles } from "@material-ui/core";

const styles = theme => ({
    dBlock: {
        display: "block !important"
    },
    dNone: {
        display: "none !important"
    },
})

function Pagination(props) {
  const { classes, items, rowsPerPage, page, handleChangePage } = props;
    return (
        <TablePagination
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{"aria-label": "Previous Page"}}
            nextIconButtonProps={{"aria-label": "Next Page"}}
            onChangePage={handleChangePage}
            classes={{
                select: classes.dNone,
                selectIcon: classes.dNone,
                actions: items.length > 0 ? classes.dBlock : classes.dNone,
                caption: items.length > 0 ? classes.dBlock : classes.dNone
            }}
            labelRowsPerPage=""
        />
    )    
}

Pagination.propTypes = {
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    handleChangePage: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(Pagination);
