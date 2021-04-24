import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { FetchNoteList } from "../api/Notes"
import AddOrder from "./AddOrder"
import OrderTable from "./OrderTable";

function Orders() {
  const [notes, setNotes] = useState([]);  
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);

  useEffect(() => {FetchNoteList(setNotes);}, [setNotes]);

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddOrder onClose={()=>{setIsNewDiagOpen(false)}} />
      </Paper>
    );
  }
  return (
    <Paper>
      <OrderTable notes={notes} onNewButtonClick={()=>{setIsNewDiagOpen(true)}} />
    </Paper>    
  );
}

export default Notes;
