import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Button, Divider, List, ListItemText, Toolbar, Paper, withStyles } from "@material-ui/core";
import { Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import HighlightedInformation from "../shared/HighlightedInformation"
import Pagination from "../shared/Pagination"

const rowsPerPage = 25;

function NoteTable(props) {
    const { classes, notes, onNewButtonClick } = props;
    const [page, setPage] = useState(0);

    const handleChangePage = useCallback((_, page) => { 
        setPage(page); 
    }, [setPage]);

    const emptyTable = (
        <Box>
            <HighlightedInformation>
                No hay albaranes en el sistema.
            </HighlightedInformation>
        </Box> 
    );

    const contentTable = (
        <TableBody>
        {notes
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((note, index) => (
            <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row">
                {note.reference}
                </TableCell>
                <TableCell component="th" scope="row">
                {note.price}
                </TableCell>
                <TableCell component="th" scope="row">
                {note.comment}
                </TableCell>                                
            </TableRow>
            ))}
        </TableBody> 
    );

    return (
        <Paper>
            <List>
                <Toolbar>
                    <ListItemText primary="Lista de partes" />
                    <Button variant="contained" color="secondary" disableElevation onClick={onNewButtonClick}>
                        Añadir material
                    </Button>
                </Toolbar>
                <Divider/>
                <Box>
                    <Table aria-labelledby="tableTitle">
                        {notes.length ? contentTable : emptyTable }
                    </Table>
                    <Pagination items={notes} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
                </Box>                
            </List>
        </Paper>    
    );
}

NoteTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default NoteTable;
