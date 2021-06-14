import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { FetchClients } from './api/Clients'

export default function SearchSelectClient(props) {
    const { onClientSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchClients(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 400 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(ev, client) => { onClientSelected(client); }} 
            getOptionLabel={(option) => option.name + " " + option.surname}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un client"
                    variant="outlined"                 
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />        
    );
}
