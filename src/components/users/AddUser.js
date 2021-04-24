import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import ActionPaper from "../shared/ActionPaper";
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import AddClientOptions from "./AddUserOptions";
import { Client, ClientInit, EmptyClient } from '../models/Client'
import { FetchClientList, PostNewClient } from '../api/Client'

function AddClient(props) {
  const { pushMessageToSnackbar, onClose } = props;

  const [client, setClient] = useState(Object);
  const [loading, setLoading] = useState(false);

  const handlePost = useCallback((response) => {
    console.log(response.json());
    onClose();
  }, [onClose]);

  const setClientParam = useCallback((prop, value) => { 
    let newClient = { ...client };
    newClient[prop] = value; 
    setClient(newClient);
  }, [client, setClient]);

  /*const handlePost = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your post has been uploaded",
      });
      onClose();
    }, 1500);
  }, [setLoading, onClose, pushMessageToSnackbar]);*/

  useEffect(() => {FetchClientList(setClient);}, [setClient]);

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        content={ <AddClientOptions client={client} setParam={setClientParam} /> }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              onClick={ () => { PostNewClient(client, handlePost) } }
              variant="contained"
              color="secondary"
              disabled={ loading }
            >
              Upload {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

AddClient.propTypes = {
  onClose: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
};

export default AddClient