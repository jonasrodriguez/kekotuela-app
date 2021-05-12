import React, { useState, useEffect, useCallback } from "react";
import { Paper } from "@material-ui/core";
import NoteTable from "./NoteTable";
import AddNote from "./AddNote";
import DeleteDialog from "../shared/DeleteDialog"
import { FetchNoteList, DeleteNoteById } from "../api/Notes"

function Notes(props) {
  const { mainSnackBar } = props;
  const [notes, setNotes] = useState([]);  
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({open: false, name:'', id: '', message:''});

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    FetchNoteList(setNotes);
  } 

  const updateNote = useCallback((index) => { 
    console.log("Update " + index);
  }, [notes]);

  const deleteNote = useCallback((index) => { 
    const note = notes[index];
    setDeleteInfo({open: true, name: "Nota", id: note._id, message: "la nota con referencia " + note.reference});
  }, [notes]);

  const onCloseDelete = () => {
    setDeleteInfo({open: false, name:'', id: '', message:''});
    FetchNoteList(setNotes);
  }

  useEffect(() => {FetchNoteList(setNotes);}, [setNotes]);

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddNote onClose={onDiagClose} mainSnackBar={mainSnackBar} />
      </Paper>
    );
  }
  return (
    <Paper>
      <NoteTable notes={notes} openNewNote={()=>{setIsNewDiagOpen(true)}} updateNote={updateNote} deleteNote={deleteNote} />
      <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteNoteById} mainSnackBar={mainSnackBar} />
    </Paper>    
  );
}

export default Notes;
