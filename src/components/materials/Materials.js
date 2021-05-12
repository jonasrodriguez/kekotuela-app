import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import SnackbarError from "../shared/SnackbarError";
import MaterialsTable from "./MaterialsTable";
import AddMaterials from "./AddMaterials";
import { FetchMaterialList } from "../api/Material"

function Materials(props) {
  const { mainSnackBar } = props;
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);  
  const [materials, setMaterials] = useState([]);

  useEffect(() => {FetchMaterialList(setMaterials);}, [setMaterials]);

  const onModalClose = () => {   
    setIsNewMaterialOpen(false);
    FetchMaterialList(setMaterials);
  } 

  if (isNewMaterialOpen) {
    return (
      <Paper>
        <AddMaterials mainSnackBar={mainSnackBar} onClose={onModalClose} />
      </Paper>
    );
  }
  return (
    <Paper>
      <MaterialsTable materials={materials} onNewButtonClick={()=>{setIsNewMaterialOpen(true)}} />
    </Paper>    
  );
}

Materials.propTypes = {
  mainSnackBar: PropTypes.func
}

export default Materials;
