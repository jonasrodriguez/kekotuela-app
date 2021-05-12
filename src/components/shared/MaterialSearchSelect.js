import React, { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from "@material-ui/core";
import { FetchMaterialList } from "../api/Material"

export default function MaterialSearchSelect(props) {
    const { onMaterialSelected } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => { FetchMaterialList(setOptions); }, [setOptions]); 

    return (
        <Autocomplete 
            style={{ width: 400 }}
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
                    variant="outlined"                 
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />        
    );
}
