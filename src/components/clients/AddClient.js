import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import ActionPaper from "../shared/ActionPaper";
import ButtonCircularProgress from "../shared/ButtonCircularProgress";
import AddClientOptions from "./AddClientOptions";
import Client from '../shared/models/Client'

function AddClient(props) {
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;

  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(new Client());

  const handleUpload = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your post has been uploaded",
      });
      onClose();
    }, 1500);
  }, [setLoading, onClose, pushMessageToSnackbar]);
  
  /*const fetchClient = useCallback(() => {
    fetch('http://localhost:3001/clients/6053165acafe63490c5e45d8')
    .then(res => res.json())
    .then((data) => { setClient(data); })  
  }, [setClient]);

  useEffect(() => {fetchClient();}, [fetchClient]);*/

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        content={ <AddClientOptions client={client}/> }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              onClick={handleUpload}
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

export default AddClient;
