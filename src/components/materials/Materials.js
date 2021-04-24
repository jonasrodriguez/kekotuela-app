import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import SnackbarError from "../shared/SnackbarError";
import MaterialsTable from "./MaterialsTable";
import AddMaterials from "./AddMaterials";
import { FetchMaterialList } from "../api/Material"

function Materials(props) {
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);  
  const [materials, setMaterials] = useState([]);
  const [snackBar, setSnackBar] = useState({open:false, message:'None'});

  useEffect(() => {FetchMaterialList(setMaterials);}, [setMaterials]);

  const onNewMaterialClose = () => {   
    console.log("onNewMaterialClose");
    setIsNewMaterialOpen(false);
    FetchMaterialList(setMaterials);
  } 

  if (isNewMaterialOpen) {
    return (
      <Paper>
        <AddMaterials parentSnackbar={snackBar} onClose={onNewMaterialClose} />
      </Paper>
    );
  }
  return (
    <Paper>
      <MaterialsTable materials={materials} onNewButtonClick={()=>{setIsNewMaterialOpen(true)}} />
      <SnackbarError message={snackBar.message} open={snackBar.open} />
    </Paper>    
  );
}

Materials.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Materials;
