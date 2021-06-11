import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { FetchUsers } from "../shared/api/Users";

export default function UserSearchSelect(props) {
    const { onOptionSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchUsers(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 200 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(ev, note) => { onOptionSelected(note); }} 
            getOptionLabel={(option) => option.userName}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un usuario"
                    variant="outlined"                                     
                    InputProps={{
                        ...params.InputProps,  
                    }}
                />
            )}
        />        
    );
}
