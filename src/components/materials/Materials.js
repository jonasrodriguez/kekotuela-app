import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, List } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import MaterialsTable from "./MaterialsTable";
import AddMaterials from "./AddMaterials";
import DeleteDialog from "../shared/DeleteDialog";
import SectionHeader from "../shared/SectionHeader";
import { FetchMaterials, DeleteMaterial } from '../shared/api/Materials';

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Materials(props) {
  const { classes, mainSnackBar } = props;
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState('');
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({open: false, name: '', id: '', message: ''});
  const [updateInfo, setUpdateInfo] = useState({update: false, material: null});

  useEffect(() => {FetchMaterials(setMaterials)}, [setMaterials]);

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    setUpdateInfo({update:false, user:null});
    FetchMaterials(setMaterials);
  } 

  const updateItem = useCallback((index) => { 
    setUpdateInfo({update: true, material: materials[index]})
    setIsNewDiagOpen(true);
  }, [materials]);

  const deleteItem = useCallback((index) => { 
    const mat = materials[index];
    setDeleteInfo({open: true, name: "Material", id: mat._id, message: "material " + mat.name});
  }, [materials]);

  const onCloseDelete = () => {
    setDeleteInfo({open: false, name:'', id: '', message:''});
    FetchMaterials(setMaterials);
  }


  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddMaterials mainSnackBar={mainSnackBar} onClose={onDiagClose} updateInfo={updateInfo} />
      </Paper>
    );
  }
  return (
    <Paper>
      <List disablePadding>
        <SectionHeader title="Lista Materiales" searchFunc={value => {setFilter(value)}} buttonText="Añadir material" buttonFunc={() => {setIsNewDiagOpen(true)}} />
        <Divider className={classes.divider} />
        <MaterialsTable materials={materials} filter={filter} updateItem={updateItem} deleteItem={deleteItem} />
        <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteMaterial} mainSnackBar={mainSnackBar} />
      </List>       
    </Paper>    
  );
}

Materials.propTypes = {
  classes: PropTypes.object.isRequired,
  mainSnackBar: PropTypes.func.isRequired,
}

export default withStyles(styles)(Materials);
