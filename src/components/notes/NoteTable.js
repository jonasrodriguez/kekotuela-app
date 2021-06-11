import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Box, Grid, Paper, TextField, Typography } from "@material-ui/core";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RowControls from "../shared/RowControls"
import Pagination from "../shared/Pagination"
import { formatDate } from "../shared/functions/formatDate"
import HighlightedInformation from "../shared/HighlightedInformation"

const styles = theme => ({
  tableWrapper: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  contentWrapper: {
    padding: theme.spacing(3),
    width: "100%"
  },
});

const rowsPerPage = 25;

function NoteTable(props) {
  const { classes, notes, updateNote, deleteNote, filters } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback((_, page) => { 
    setPage(page); 
  }, [setPage]);

  const filterNote = (note) => {
    var filter = true;
    if (filters.priority && !note.priority) {
      return false;
    }
    if (filters.scheduled && note.scheduledDate) {
      return false;
    }    
    return filter;
  }

  if (!notes.length) {
    return (
      <Box className={classes.contentWrapper}>
        <HighlightedInformation>
          No hay notas en el sistema.
        </HighlightedInformation>
      </Box>   
    );
  }
  return (    
    <Box className={classes.tableWrapper}>
      {notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(note => { return filterNote(note) })
        .map((note, index) => (
        <Paper variant="outlined" className={classes.paper} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">{note.reference}</Typography>
              <Typography variant="body2" gutterBottom> {note.description}</Typography>
              <Box display={(note.priority) ? "block" : "none"}>
                <NotificationsActiveIcon color="secondary" />
              </Box>
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
            <Grid container spacing={2} item xs={3}>
              <Grid item>
                <TextField label="Operario asignado" value={note.scheduledUser} InputProps={{ readOnly: true, }} variant="outlined" size="small" />
              </Grid>
              <Grid item>
                <TextField label="Fecha programada" value={formatDate(note.scheduledDate, true)} InputProps={{ readOnly: true, }} variant="outlined" size="small" />
              </Grid>              
            </Grid>
            <Grid item> 
              <RowControls updateItem={() => updateNote(index)} deleteItem={() => deleteNote(index)} />
            </Grid>            
          </Grid>
        </Paper>
      ))}      
      <Pagination items={notes} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} />
    </Box>
  );
}

NoteTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openNewNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NoteTable);
