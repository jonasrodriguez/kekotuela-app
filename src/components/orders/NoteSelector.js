import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardActions, CardContent, Button, Typography, Grid } from "@material-ui/core";
import { Note } from "../shared/models/Models";
import NoteSearchSelect from "../shared/SearchSelectNote";

function NoteSelector(props) {
  const { order, onUpdateNote, updateInfo } = props;
  const [showNoteInfo, setShowNoteInfo] = useState((updateInfo.update) ? true : false);

  const onNoteSelected = useCallback((note) => {
    onUpdateNote(note);
    setShowNoteInfo(true);
  }, [onUpdateNote]);

  const onNoteReset = useCallback(() => {
    onUpdateNote(Note);
    setShowNoteInfo(false);
  }, [onUpdateNote]);

  const NoteDetails = (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card variant="outlined">
          <CardHeader subheader= "Detalles Nota"/>
          <CardContent>
            <Typography variant="h5" component="h2">
              {order.note.description}
            </Typography>                 
            <Typography variant="body2" component="p">
            Ref. {order.note.reference} <br/> {order.note.comments}
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
              {order.client.name} {order.client.surname} {order.client.second_surname}          
            </Typography>
            <Typography variant="body2" component="p">
              {order.client.phone} - {order.client.email} <br/>
              {order.client.address}, {order.client.cp}, {order.client.city}
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
  onNote: PropTypes.object.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  updateInfo: PropTypes.object.isRequired,
};

export default NoteSelector;