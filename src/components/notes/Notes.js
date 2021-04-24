import React, { useState, useEffect } from "react";
import { Paper, withStyles } from "@material-ui/core";
import NoteTable from "./NoteTable";
import AddNote from "./AddNote";
import { FetchNoteList } from "../api/Notes"

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Notes() {
  const [notes, setNotes] = useState([]);  

  useEffect(() => {FetchNoteList(setNotes);}, [setNotes]);

  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddNote onClose={()=>{setIsNewDiagOpen(false)}} />
      </Paper>
    );
  }
  return (
    <Paper>
      <NoteTable notes={notes} openNewNote={()=>{setIsNewDiagOpen(true)}} />
    </Paper>    
  );
}

export default withStyles(styles)(Notes);
