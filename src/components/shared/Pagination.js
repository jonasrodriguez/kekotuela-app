import React, { useState } from "react";
import PropTypes from "prop-types";
import { TablePagination } from "@material-ui/core";

function Pagination(props) {
  const { items, page, onChangePage } = props;
  const [rowsPerPage, setRowsPerPage] = useState(page.rowsPerPage);

  const handleChangePage = (event, newPage) => {
    onChangePage({page: newPage, rowsPerPage: page.rowsPerPage});
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    onChangePage({page: page.page, rowsPerPage: event.target.value});
  };

  return (
    <TablePagination
        component="div"
        count={items.length}
        page={page.page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Elementos por pagina:"
    />
  )    
}

Pagination.propTypes = {
  items: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.object,
  handleChangePage: PropTypes.func
};

export default Pagination;
