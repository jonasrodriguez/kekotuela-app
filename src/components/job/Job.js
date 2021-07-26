import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, Toolbar, Typography, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import NoteTable from "./NoteTable";
import AddNote from "./AddNote";
import DeleteDialog from "../shared/DeleteDialog"
import { FetchNotes, DeleteNote } from "../shared/api/Notes"

const styles = {
  title: {
    flexGrow: 1,
  }, 
  divider: {
    borderColor: "rgba(0, 0, 0, 0.26)"
  }
};

const emptyUpdate = {update:false, note:''}
const emptyDelete = {open:false, name:'', id: '', message:''}
const emptyFilters = {priority:false, scheduled:false}

function Job(props) {
  const { classes, mainSnackBar } = props;
  const [notes, setNotes] = useState([]);
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(emptyUpdate);
  const [deleteInfo, setDeleteInfo] = useState(emptyDelete);
  const [filters, setFilters] = useState(emptyFilters);

  useEffect(() => {FetchNotes(setNotes);}, [setNotes]);

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    setUpdateInfo(emptyUpdate);
    FetchNotes(setNotes);
  } 

  const updateItem = useCallback((index) => { 
    setUpdateInfo({update:true, note:notes[index]})
    setIsNewDiagOpen(true);
  }, [notes]);

  const deleteItem = useCallback((index) => { 
    const note = notes[index];
    setDeleteInfo({open: true, name: "Nota", id: note._id, message: "la nota con referencia " + note.reference});
  }, [notes]);

  const onCloseDelete = () => {
    setDeleteInfo(emptyDelete);
    FetchNotes(setNotes);
  } 

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddNote onClose={onDiagClose} mainSnackBar={mainSnackBar} updateInfo={updateInfo} />
      </Paper>
    );
  }
  return (
    <Paper>
      <Toolbar className={classes.appbar}>
        <Typography variant="h6" className={classes.title}>
          Lista notas
        </Typography>
        <FormControlLabel
            label="Prioritarios"
            control={ <Checkbox color="primary" checked={filters.priority} onChange={(event) => {setFilters({...filters, priority: event.target.checked})}} /> }
        />
        <FormControlLabel
            label="No programados"
            control={ <Checkbox color="primary" checked={filters.scheduled} onChange={(event) => {setFilters({...filters, scheduled: event.target.checked})}} /> }
        />
        <Button variant="contained" onClick={() => {setIsNewDiagOpen(true)}}>
          Añadir nota
        </Button>
      </Toolbar>
      <Divider className={classes.divider} />
      <NoteTable notes={notes} updateNote={updateItem} deleteNote={deleteItem} filters={filters} />
      <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteNote} mainSnackBar={mainSnackBar} />
    </Paper>    
  );
}

Job.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Job);
