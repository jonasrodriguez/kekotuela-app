import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ImageIcon from "@material-ui/icons/Image";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkIcon from '@material-ui/icons/Work';
import BuildIcon from '@material-ui/icons/Build';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';

const styles = (theme) => ({ 
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navList: {
    backgroundColor: theme.palette.common.black,
  },  
  menuIcon: {
    color: theme.palette.common.white,
  },
  menuText: {
    color: theme.palette.common.white,
  },
});

function NavItems(props) {
  const { classes } = props;
  //const [selectedTab, setSelectedTab] = useState(-1);

  const NavItems = [
    {
      link: "/c/notes",
      name: "Notas",
      icon: ( <DashboardIcon fontSize="small" className={classes.menuIcon} /> )
    },
    {
      link: "/c/orders",
      name: "Partes",
      icon: ( <ImageIcon fontSize="small" className={classes.menuIcon} /> )
    },
    {
      link: "/c/materials",
      name: "Materiales",
      icon: ( <BuildIcon fontSize="small" className={classes.menuIcon} /> )
    },
    {
      link: "/c/services",
      name: "Servicios",
      icon: ( <FormatPaintIcon fontSize="small" className={classes.menuIcon} /> )
    },  
    {
      link: "/c/clients",
      name: "Clientes",
      icon: ( <PeopleAltIcon fontSize="small" className={classes.menuIcon} /> )     
    },
    {
      link: "/c/users",
      name: "Usuarios",
      icon: ( <WorkIcon fontSize="small" className={classes.menuIcon} /> )
    },       
  ];

  const onLinkClick = index => {
    console.log(index);
  }

  return (
    <List className={classes.navList}>
      {NavItems.map((element, index) => (
        <Link key={index}  className={classes.menuLink}
          to={element.link} onClick={() => {onLinkClick(index)}}
        >
          <ListItem button divider >
            <ListItemIcon>
              {element.icon}
            </ListItemIcon>
            <ListItemText primary={element.name} className={classes.menuText} />
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

NavItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles, { withTheme: true })(NavItems));
