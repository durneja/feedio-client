import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import Neon, { rpc, sc, u, wallet, tx } from "@cityofzion/neon-js";
import useStyles from "./styles";

export default function Dashboard(props) {
  var classes = useStyles();
  const [data, setData] = useState([]);
  
  const [lastUpdatedTimeStamp, setLastUpdatedTimeStamp] = useState(null);
  
  useEffect(() => {
    // trigger API call here on page load

    const rpcClient = new rpc.RPCClient("http://seed1t4.neo.org:20332");
    const feedioScriptHash = "e0bd649469db432189f15cf9edbe5b1b8bd20a5f";

    const fetchPrice = async (token) => {

      const result = await rpcClient.invokeFunction(
          feedioScriptHash,
          "getLatestTokenPrices",[],
          [
            new tx.Signer({
              // account: config.account.scriptHash,
              account: new wallet.Account("fb7f465e3a992594537b7b2bc4fbe80fcbbb90dcfe33a4bfc8e1f351598d4c8e").scriptHash,
              scopes: tx.WitnessScope.Global,
            }),
          ]
      );

			return JSON.parse(Neon.u.base642utf8(result.stack[0].value));
    }

    const tokenConfigs = [
      {"tokenKey": "NEO", "name": "NEO", "icon": <Avatar src='https://s2.coinmarketcap.com/static/img/coins/64x64/1376.png'/>},
      {"tokenKey": "GAS", "name": "GAS", "icon": <Avatar src='https://s2.coinmarketcap.com/static/img/coins/64x64/1785.png'/>},
      {"tokenKey": "BTC", "name": "Bitcoin", "icon": <Avatar src='https://prismic-io.s3.amazonaws.com/data-chain-link/19a58483-b100-4d09-ab0d-7d221a491090_BTC.svg'/>},
      {"tokenKey": "ETH", "name": "Ethereum", "icon": <Avatar src='https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'/>},
      {"tokenKey": "BNB", "name": "Binance Coin", "icon": <Avatar src='https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'/>},
      {"tokenKey": "MATIC", "name": "Polygon MATIC", "icon": <Avatar src='https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'/>}
    ];

    var priceData = [];
    var sequence = [4, 2, 3, 1, 5, 0];
    fetchPrice().then(function(resp) {
        console.log(resp);
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          const value = element[1];
          const decimals = element[2];
          
          let tokenConfig = tokenConfigs[sequence[index]];
          tokenConfig.value = value / Math.pow(10, decimals);
          priceData.push(tokenConfig);
  
        }

        setData(tokenConfigs);
    })
  }, []);

  // get latest updated timestamp
  useEffect(() => {
    const rpcClient = new rpc.RPCClient("http://seed1t4.neo.org:20332");
    const feedioScriptHash = "e0bd649469db432189f15cf9edbe5b1b8bd20a5f";

    const fetchLatestUpdatedTimeStamp = async (token) => {
      // do your api call here
      const result = await rpcClient.invokeFunction(
          feedioScriptHash,
          "getLastUpdatedTime",[],
      );

			return result.stack[0].value;
    }

    fetchLatestUpdatedTimeStamp().then(function(resp) {
      console.log(resp);
      const date = new Date(resp / 1);
      setLastUpdatedTimeStamp(date.toString());
    })
  }, []);

  console.log('lastUpdatedTimeStamp--', lastUpdatedTimeStamp);

  return (
    <>
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <p><b>Last updated at: {lastUpdatedTimeStamp ? <time datetime={lastUpdatedTimeStamp}>{lastUpdatedTimeStamp}</time> : 'Data not available'}</b></p>
        <List style={{ display: 'flex', flexDirection: 'column', gridGap: 16, width: 600 }}>
        {data.map((item) => {
          return (
            <ListItem
              className={classes.list}
              key={item.name}
            >  
              <ListItemAvatar style={{ display: 'flex' }}>
                {item.icon}
              </ListItemAvatar>
              <ListItemText primary={<b>{item.name}</b>}/>
              <ListItemSecondaryAction>
                <ListItemText primary={<b>{item.value}</b>} />
              </ListItemSecondaryAction>
          </ListItem>
          )
        })}
        </List>
      </div>
    </>
  );
}
