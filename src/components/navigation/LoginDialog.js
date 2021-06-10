import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Checkbox, Typography, FormControlLabel } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import VisibilityPasswordTextField from "../shared/VisibilityPasswordTextField";
import Auth from "../shared/Auth"
import { isAlphaNumeric } from "../shared/functions/isAlphaNumeric"
import { Login } from "../shared/api/Users";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
    maxWidth: 300
  },
  actions: {
    marginTop: theme.spacing(2)
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0
  }  
});

function LoginDialog(props) {
  const { classes, open, onClose } = props;
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef(); 

  const login = useCallback(() => {
    Auth.loginStatus = true;
    setIsLoading(true);        
    if (loginEmail.current.value === "" || !isAlphaNumeric(loginEmail.current.value)) {
      setTimeout(() => {
        setStatus("invalidUsername");
        setIsLoading(false);
      }, 1500);
    }
    else if (loginPassword.current.value === "") {
      setTimeout(() => {
        setStatus("invalidPassword");
        setIsLoading(false);
      }, 1500);
    }   
    else {
      Login(loginEmail.current.value, loginPassword.current.value, loginResponse);
    }
  }, [setIsLoading, loginEmail, loginPassword]);

  const loginResponse = useCallback((data) => {
    if (data) {
      Auth.username = data.user;
      Auth.token = data.token;
      Auth.loginStatus = true;
      onClose();
    }
    else {
      setStatus("loginError");
    }
    setIsLoading(false);

  }, [setIsLoading]);

  return (
    <Dialog  open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }} >
      <DialogTitle disableTypography>
        <Typography variant="h5">Login</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField variant="outlined" margin="normal" required fullWidth label="Nombre Usuario"
          error={status === "invalidUsername"}          
          inputRef={loginEmail}
          autoFocus
          autoComplete="off"
          helperText={
            status === "invalidUsername" &&
            "Nombre de usuario incorrecto."
          }
          FormHelperTextProps={{ error: true }}
          onChange={() => {
            if (status === "invalidUsername") {
              setStatus(null);
            }
          }}
        />
        <VisibilityPasswordTextField required fullWidth variant="outlined" margin="normal" label="Contraseña"
          error={status === "invalidPassword" || status === "loginError"}
          inputRef={loginPassword}
          autoComplete="off"
          helperText={
            status === "invalidPassword" || status === "loginError" &&
            "Usuario o Password incorrecto."
          }
          FormHelperTextProps={{ error: true }}
          onVisibilityChange={setIsPasswordVisible}
          isVisible={isPasswordVisible}
          onChange={() => {
            if (status === "invalidPassword" || status === "loginError") {
              setStatus(null);
            }
          }}
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox />}
          label={<Typography variant="body1">Recordarme</Typography>}
        />          
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" disabled={isLoading} size="large" onClick={login} >
          Login {isLoading && <ButtonCircularProgress />}
        </Button>            
      </DialogActions>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(LoginDialog));
