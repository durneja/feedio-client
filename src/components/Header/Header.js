import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
} from "@material-ui/core";
// styles
import useStyles from "./styles";
import StayCurrentLandscape from '@material-ui/icons/StayCurrentLandscape';

// components
import { Badge, Typography, Button } from "../Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <StayCurrentLandscape htmlColor="#fff"/>
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Feedio
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
