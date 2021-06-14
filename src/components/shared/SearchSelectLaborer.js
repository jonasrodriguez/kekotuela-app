import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { FetchUsers } from './api/Users';

export default function SearchSelectLaborer(props) {
    const { onLaborerSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchUsers(setOptions); }, [setOptions]);

    const onChange = (ev, user) => {
        if (user) {
            onLaborerSelected({name: user.name + ' ' + user.surname, price: user.costHour, hours: 0.0, total: 0.0});
        }
    }

    return (
        <Autocomplete 
            style={{ width: 250 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={onChange}
            getOptionLabel={(option) => option.name + ' ' + option.surname}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un operario"
                    variant="standard"                 
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />        
    );
}
