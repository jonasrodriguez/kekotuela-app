import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import { Divider, List, ListItemText, Toolbar, Button } from "@material-ui/core";
import Pagination from "../shared/Pagination"
import HighlightedInformation from "../shared/HighlightedInformation";

const styles = theme => ({
  tableWrapper: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  },
  toolbar: {
    justifyContent: "space-between"
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
});

const rowsPerPage = 25;

function NoteTable(props) {
  const { notes, classes, openNewNote } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback((_, page) => { 
    setPage(page); 
  }, [setPage]);

  const emptyTable = (
    <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay notas en el sistema.
        </HighlightedInformation>
      </Box>  
  );

  const contentTable = (
    <Box className={classes.tableWrapper}>
      {notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((note, index) => (
        <Paper variant="outlined" className={classes.paper} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">{note.reference}</Typography>
              <Typography variant="body2" gutterBottom> {note.description}</Typography>
            </Grid>
            <Grid item xs={4}>                  
              <Typography variant="body2" gutterBottom>
                {note.client.name} {note.client.surname} {note.client.second_surname}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {note.client.phone} - {note.client.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {note.client.address}. {note.client.city}, {note.client.cp}
              </Typography>
            </Grid>                
            <Grid item> 
                <TextField label="Operario asignado" value={note.user ? note.user.userName : ''} InputProps={{ readOnly: true, }} variant="outlined" size="small" />
            </Grid>
            <Grid item> 
              <TextField label="Fecha prevista" value={note.orderDate} InputProps={{ readOnly: true, }} variant="outlined" size="small" />
            </Grid>
          </Grid>
        </Paper>
      ))}      
      <Pagination items={notes} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
    </Box>
  );

  return (
    <List disablePadding>
      <Toolbar className={classes.toolbar}>
        <ListItemText primary="Lista de notas" />
        <Button variant="contained" color="secondary" disableElevation onClick={openNewNote}>
          Añadir Nota
        </Button>
      </Toolbar>
      <Divider />
      {notes.length ? contentTable : emptyTable}
    </List>
  );
}

NoteTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openNewNote: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(NoteTable);
