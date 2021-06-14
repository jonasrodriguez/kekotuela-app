import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { FetchServices } from './api/Services';

export default function SearchSelectServices(props) {
    const { onServiceSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchServices(setOptions); }, [setOptions]);

    const onChange = (ev, material) => {
        if (material) {
            onServiceSelected({name: material.name, price: material.price });
        }
    }

    return (
        <Autocomplete 
            style={{ width: 250 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={onChange} 
            getOptionLabel={(option) => option.name}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un servicio"
                    variant="standard"                 
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />        
    );
}
