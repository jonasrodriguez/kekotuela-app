import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@material-ui/core";
import { FetchMaterials } from './api/Materials';

export default function SearchSelectMaterial(props) {
    const { onMaterialSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchMaterials(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 200 }}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(ev, material) => { onMaterialSelected(material); }} 
            getOptionLabel={(option) => option.reference + " - " + option.name}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un material"
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />        
    );
}
