import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardActions, CardContent, Button, Typography, Grid } from "@material-ui/core";
import { Note } from "../shared/models/Models";
import NoteSearchSelect from "../shared/SearchSelectNote";

function NoteSelector(props) {
  const { onNote } = props;
  const [note, setNote] = useState(Note);
  const [showNoteInfo, setShowNoteInfo] = useState(false);

  const onNoteSelected = useCallback((selectedNote) => {
    setNote(selectedNote);
    setShowNoteInfo(true);
    onNote(selectedNote);
  }, [onNote]);

  const onNoteReset = useCallback(() => {
    setNote(Note);
    setShowNoteInfo(false);
    onNote(Note);
  }, [onNote]);

  const NoteDetails = (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card variant="outlined">
          <CardHeader subheader= "Detalles Nota"/>
          <CardContent>
            <Typography variant="h5" component="h2">
              {note.description}
            </Typography>                 
            <Typography variant="body2" component="p">
            Ref. {note.reference} <br/> {note.comments}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button onClick={onNoteReset}>
                  Cambiar nota
                </Button>
              </Grid>      
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card variant="outlined">
          <CardHeader subheader= "Detalles Cliente"/>
          <CardContent>
            <Typography variant="h5" component="h2">
              {note.client.name} {note.client.surname} {note.client.second_surname}          
            </Typography>
            <Typography variant="body2" component="p">
              {note.client.phone} - {note.client.email} <br/>
              {note.client.address}, {note.client.cp}, {note.client.city}
            </Typography>
          </CardContent>
        </Card>
      </Grid>      
    </Grid>
  );

  const noteSelection = (                   
    <NoteSearchSelect onNoteSelected={onNoteSelected} />
  ); 

  return (
    <Fragment>
      {showNoteInfo ? NoteDetails : noteSelection}
    </Fragment>
  );
}

NoteSelector.propTypes = {
  onNote: PropTypes.func.isRequired
};

export default NoteSelector;