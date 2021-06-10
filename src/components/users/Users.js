import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
import DeleteDialog from "../shared/DeleteDialog";
import SectionHeader from "../shared/SectionHeader";
import { FetchUsers, DeleteUser } from '../shared/api/Users';

const styles = {
  divider: {
    borderColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Users(props) {
  const { classes, mainSnackBar } = props;
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [isNewDiagOpen, setIsNewDiagOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({open: false, name:'', id: '', message:''});
  const [updateInfo, setUpdateInfo] = useState({update:false, user:null});

  useEffect(() => { FetchUsers(setUsers) }, [setUsers]);

  const onDiagClose = () => {   
    setIsNewDiagOpen(false);
    setUpdateInfo({update:false, user:null});
    FetchUsers(setUsers);
  }

  const updateItem = useCallback((index) => { 
    setUpdateInfo({update:true, user:users[index]})
    setIsNewDiagOpen(true);
  }, [users]);

  const deleteItem = useCallback((index) => { 
    const user = users[index];
    setDeleteInfo({open: true, name: "Usuario", id: user._id, message: "usuario " + user.userName});
  }, [users]);

  const onCloseDelete = () => {
    setDeleteInfo({open: false, name:'', id: '', message:''});
    FetchUsers(setUsers);    
  }

  if (isNewDiagOpen) {
    return (
      <Paper>
        <AddUser mainSnackBar={mainSnackBar} onClose={onDiagClose} updateInfo={updateInfo} /> 
      </Paper>
    );
  }
  return (
    <Paper>
      <List disablePadding>
        <SectionHeader title="Lista usuarios" searchFunc={value => {setFilter(value)}} buttonText="Añadir usuario" buttonFunc={() => {setIsNewDiagOpen(true)}} />
        <Divider className={classes.divider} />
        <UserTable users={users} filterUsers={filter} updateItem={updateItem} deleteItem={deleteItem} />
        <DeleteDialog deleteItem={deleteInfo} onClose={onCloseDelete}  apiCall={DeleteUser} mainSnackBar={mainSnackBar} />
      </List>  
    </Paper>    
  );
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
