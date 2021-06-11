import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@material-ui/core";
import { FetchClients, FetchClientFilter } from "./api/Clients";

export default function ClientSearchSelect(props) {
    const { onClientSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);    

    const onClientChange = async value => {    
        setLoading(true);
        const clients = await FetchClientFilter(value);
        setOptions(clients);
        setLoading(false);
    };

    useEffect(() => { FetchClients(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 210 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(ev, client) => { onClientSelected(client); }} 
            getOptionLabel={(option) => option.name + " " + option.surname}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un cliente"
                    variant="outlined"
                    onChange={ev => {
                        // dont fire API if the user delete or not entered anything
                        if (ev.target.value !== "" || ev.target.value !== null) {
                            onClientChange(ev.target.value);
                        }
                    }}                  
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                        ),
                    }}
                />
            )}
        />        
    );
}
