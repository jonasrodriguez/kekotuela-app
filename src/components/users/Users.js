import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import { FetchUsersList } from "../api/User"
import UserTable from "./UserTable";
import UserInfo from "./UserInfo";
import AddUser from "./AddUser";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Users(props) {
  const classes = props;
  const [users, setUsers] = useState([]);  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => { FetchUsersList(setUsers) }, [setUsers]);

  const openAddUserModal = useCallback(() => {
    setIsAddUserOpen(true);
  }, [setIsAddUserOpen]);

  const closeAddUserModal = useCallback(() => {
    setIsAddUserOpen(false);
  }, [setIsAddUserOpen]);

  /*if (setIsAddUserOpen) {
    return (
      <Paper>
        <AddUser onClose={closeAddUserModal} /> 
      </Paper>
    );
  }*/
  return (
    <Paper>
      <List disablePadding>
        <UserInfo openAddUserModal={openAddUserModal} />
        <Divider className={classes.divider} />
        <UserTable users={users} />
      </List>  
    </Paper>    
  );
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
