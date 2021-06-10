import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Grid, TextField, Switch } from "@material-ui/core";
import { InsertUser, UpdateUser } from '../shared/api/Users';
import { User } from "../shared/models/Models";
import AddItemCard from '../shared/AddItemCard';

function AddUser(props) {
  const { onClose, mainSnackBar, updateInfo } = props;
  const [user, setUser] = useState((updateInfo.update) ? updateInfo.user : User);
  const [password, setPassword] = useState((updateInfo.update) ? updateInfo.password : "");
  const [repeatPass, setRepeatPass] = useState((updateInfo.update) ? updateInfo.password : "" );
  const [errorForm, setErrorForm] = useState({passwordNotEqual:false})

  const handlePost = useCallback((response) => {
    if (response.status >= 200 && response.status < 300) {
      mainSnackBar({ text: "Usuario guardada correctamente.", isError: false});
      onClose();
    }
    else {
      mainSnackBar({ text: "Error al guardar el usuario!", isError: true});
    }
  }, [mainSnackBar, onClose]);

  const onValidation = () => {
    var correct = true;

    if (password !== repeatPass) {
      setErrorForm({...errorForm, passwordNotEqual:true}); 
      correct = false;    
    } else {
      setErrorForm({...errorForm, passwordNotEqual:false}); 
    }

    if (correct) {
      (updateInfo.update) ? UpdateUser(user._id, user, handlePost) 
        : InsertUser(user, handlePost);
    }
  }

  const content = (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={3}>
        <TextField label="Usuario" variant="outlined" value={user.userName} onChange={(event) => {setUser({...user, userName: event.target.value})}} />
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel
          control={
            <Switch color="secondary"
              onChange={() => { setUser({...user, permissionLevel: !user.permissionLevel ? 1 : 0}); }}
              checked={(user.permissionLevel > 0) ? true : false}
            />
          }
          label="Administrador"
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={3}>
        <TextField label="Nombre" variant="outlined" value={user.name} onChange={(event) => {setUser({...user, name: event.target.value})}} />
      </Grid>
      <Grid item xs={3}>
        <TextField label="Apellido" variant="outlined" value={user.surname} onChange={(event) => {setUser({...user, surname: event.target.value})}} />
      </Grid> 
      <Grid item xs={6} />
      <Grid item xs={3}>
        <TextField label="Telefono" variant="outlined" value={user.phone} onChange={(event) => {setUser({...user, phone: event.target.value})}} />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth={true} label="Correo" variant="outlined" value={user.email} onChange={(event) => {setUser({...user, email: event.target.value})}} />
      </Grid>
      <Grid item xs={5} />
      <Grid item xs={3}>
        <TextField label="Contraseña" type="password" value={password} onChange={(event) => {setPassword(event.target.value); setUser({...user, password: password});}} variant="outlined" />
      </Grid>
      <Grid item xs={3}>
        <TextField label="Repetir Contraseña" type="password" error={errorForm.passwordNotEqual} 
          helperText={errorForm.passwordNotEqual ? "La contraseña introducida no es igual" : ""} value={repeatPass} 
          onChange={(event) => {setRepeatPass(event.target.value)}} variant="outlined" />
      </Grid>
    </Grid>
  )

  return (
    <AddItemCard 
      title="Añadir usuario"
      content={content}      
      onOk={() => { onValidation() }}
      onCancel={onClose}
    />
  );
}

AddUser.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default AddUser;