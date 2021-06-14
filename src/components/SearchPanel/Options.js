import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Switch from "@material-ui/core/Switch"
import { optionsIcons } from "@src/Constants"
import { useQueryParams, StringParam, BooleanParam } from 'use-query-params'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
  },
}))
const defaultChecked = false;
const optionsObj = {};
const querySearch = {};
optionsIcons.forEach(({ name }) => {
  optionsObj[name] = defaultChecked;
  querySearch[name] = StringParam;
});

export default function Options({ onCallback }) {
  const classes = useStyles();
  const [options, setOptions] = useState(optionsObj);
  const [query] = useQueryParams(querySearch);

  const handleChange = event => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  }

  const setStartParams = (options) => {
    for(let option in query){
      query[option] = query[option] === 'true' ? true : false;
    }
    setOptions({ ...options, ...query });
  }

  useEffect(() => {
    setStartParams(options);
  }, [])

  useEffect(() => {
    onCallback(options);
  }, [options])

  return (
    <List
      subheader={<ListSubheader>Поиск по опциям</ListSubheader>}
      className={classes.root}
    >
      {optionsIcons.map(({ icon, label, name }, ind) => (
        <ListItem key={ind}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText id={`switch-list-label-${name}`} primary={label} />
          <ListItemSecondaryAction>
            <Switch
              onChange={e => handleChange(e)}
              edge="end"
              checked={options[name]}
              name={name}
              inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
