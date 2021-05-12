import React, { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from "@material-ui/core";
import { FetchNoteList } from "../api/Notes"

export default function NoteSearchSelect(props) {
    const { onNoteSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchNoteList(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 400 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(ev, note) => { onNoteSelected(note); }} 
            getOptionLabel={(option) => option.reference + " - " + option.description}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione una nota"
                    variant="outlined"                                     
                    InputProps={{
                        ...params.InputProps,  
                    }}
                />
            )}
        />        
    );
}
