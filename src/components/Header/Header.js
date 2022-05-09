import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import clsx from 'classnames';
// styles
import useStyles from "./styles";
import StayCurrentLandscape from '@material-ui/icons/StayCurrentLandscape';

// components
import { Badge, Typography, Button } from "../Wrappers";

export default function Header(props) {
  var classes = useStyles();

  const [neoN3Data, _setNeoN3Data] = useState({});
  const neoN3DataRef = React.useRef(neoN3Data);

  const setNeoN3Data = (data) => {
    neoN3DataRef.current = data;
    _setNeoN3Data(data);
  };

  const setN3Data = (data) => {
    setNeoN3Data(data);
    console.log('neoN3DataRef--', neoN3DataRef.current);
  };

  React.useEffect(() => {
    window.addEventListener('NEOLine.N3.EVENT.READY', () => {
      // eslint-disable-next-line no-undef
      const n3 = new NEOLineN3.Init();
      // console.log('inside login', n3);
      setN3Data(n3);
    });
  }, [neoN3Data]);

  const connectToNeoWallet = () => {
    // console.log(neoN3Data, '--neoN3Data')
    neoN3Data.getAccount();
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <StayCurrentLandscape htmlColor="#fff"/>
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Feedio
        </Typography>

        <div style={{ marginLeft: 'auto' }}>
          <form className={classes.form} noValidate>
            <Button
              // variant="contained"
              color="#fff"
              className={clsx(classes.secondaryColor, {
                [classes.disabled]: Object.keys(neoN3Data).length === 0,
              })}
              onClick={(e) => connectToNeoWallet(e)}
            >
              {Object.keys(neoN3Data).length === 0
                && <CircularProgress size={16} />}
              Connect to Neo Wallet
            </Button>
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}
