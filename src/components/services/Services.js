import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Paper, Divider, List, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ServicesTable from "./ServicesTable";
import LaborersTable from "./LaborersTable";
import ServicesHeader from "./ServicesHeader";
import DeleteDialog from "../shared/DeleteDialog";
import { FetchUsers, DeleteUser } from "../shared/api/Users";
import { FetchServices, DeleteService } from "../shared/api/Services";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Services(props) {
  const { classes, mainSnackBar } = props;
  const [services, setServices] = useState([]);
  const [laborers, setLaborers] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterLaborer, setFilterLaborer] = useState('');
  const [deleteInfo, setDeleteInfo] = useState({open: false, name: '', id: '', message: ''});

  useEffect(() => {FetchServices(setServices)}, [setServices]);
  useEffect(() => {FetchUsers(setLaborers)}, [setLaborers]);

  const deleteLaborer = useCallback((index) => { 
    const labs = laborers[index];
    setDeleteInfo({open: true, name: "Operario", id: labs._id, message: "operario " + labs.name});
  }, [laborers]);

  const deleteService = useCallback((index) => { 
    const serv = services[index];
    setDeleteInfo({open: true, name: "Servicio", id: serv._id, message: "servicio " + serv.name});
  }, [services]);

  const onCloseDelete = () => {
    setDeleteInfo({open: false, name:'', id: '', message:''});
    FetchServices(setServices);
    FetchUsers(setLaborers);
  }

  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List disablePadding>
            <ServicesHeader title="Servicios" searchFunc={value => {setFilter(value)}} />
            <Divider className={classes.divider} />
            <ServicesTable services={services} filter={filter} mainSnackBar={mainSnackBar} updateContent={() => {FetchServices(setServices)}} deleteItem={deleteService} />
            <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteService} mainSnackBar={mainSnackBar} />
          </List> 
        </Grid>        
        <Grid item xs={6}>
          <List disablePadding>
            <ServicesHeader title="Operarios" searchFunc={value => {setFilterLaborer(value)}} />
            <Divider className={classes.divider} />
            <LaborersTable laborers={laborers} filter={filterLaborer} mainSnackBar={mainSnackBar} updateContent={() => {FetchUsers(setLaborers)}} deleteItem={deleteLaborer} />
            <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteUser} mainSnackBar={mainSnackBar} />
          </List> 
        </Grid>
      </Grid>            
    </Paper>    
  );
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Services);
