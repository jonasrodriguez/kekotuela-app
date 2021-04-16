import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
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

  const fetchUserList = useCallback(() => {
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then((data) => { setUsers(data); })  
  }, [setUsers]);

  useEffect(() => {fetchUserList();}, [fetchUserList]);

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
