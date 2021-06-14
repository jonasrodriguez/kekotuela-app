import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { Table, TableHead, TableRow, TableBody, TableCell, Typography } from "@material-ui/core";
import SearchSelectServices from '../shared/SearchSelectServices';
import DeleteIcon from '@material-ui/icons/Delete';

const headers = [
  {
    id:'name',
    name:'Nombre',
  },
  {
    id:'controls',
  },  
]

function ServiceSelector(props) {
  const { services, onUpdateServices } = props;

  const onInsert = useCallback((service) => {
    onUpdateServices([...services, service]);    
  }, [services, onUpdateServices]);

  const onRemove = useCallback((index) => {
    onUpdateServices(services.filter((item, idx) => idx !== index))
  }, [services, onUpdateServices]);
  
  const tableContent = (
    services
      .map((service, index) => (
      <TableRow hover key={index}>
        <TableCell component="th" scope="row">
          {service.name}
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton onClick={() => { onRemove(index); }}>
            <DeleteIcon color="secondary" fontSize="small" />
          </IconButton>         
        </TableCell>
      </TableRow>           
    ))
  );

  return (
    <Card variant="outlined">
      <CardHeader subheader="Servicios" />
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers
                .map((head, index) => (
                <TableCell key={index}>
                  <Typography variant="subtitle2">
                    {head.name}
                  </Typography>
                </TableCell>            
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent}
            <TableRow key={services.length + 1}>
              <TableCell>
                <SearchSelectServices onServiceSelected={onInsert} />
              </TableCell>
            </TableRow>                 
          </TableBody>
        </Table>
      </CardContent>
    </Card>      
  );
}

ServiceSelector.propTypes = {
  services: PropTypes.array.isRequired,
  onUpdateServices: PropTypes.func.isRequired,
};

export default ServiceSelector;
