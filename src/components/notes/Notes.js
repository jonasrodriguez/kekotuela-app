import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import NoteTable from "./NoteTable";
import AddNote from "./AddNote";
import { FetchNoteList } from "../api/Notes"

function Notes(props) {
  const { mainSnackBar } = props;
  const [notes, setNotes] = useState([]);  

  useEffect(() => {FetchNoteList(setNotes);}, [setNotes]);

  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddNote onClose={()=>{setIsNewDiagOpen(false)}} mainSnackBar={mainSnackBar} />
      </Paper>
    );
  }
  return (
    <Paper>
      <NoteTable notes={notes} openNewNote={()=>{setIsNewDiagOpen(true)}} />
    </Paper>    
  );
}

export default Notes;
