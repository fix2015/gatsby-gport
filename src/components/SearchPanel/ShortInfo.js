import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"

import { SHORT_INFO } from "@src/Constants"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListSubheader from "@material-ui/core/ListSubheader"
import { StringParam, useQueryParam } from "use-query-params"

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    maxWidth: 520,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    textAlign: "center",
  },
}))

const searchShortInfo = SHORT_INFO.filter(({ search }) => search)
const shortInfoObj = {}
searchShortInfo.forEach(({ name }) => {
  shortInfoObj[name] = ""
})

export default function ShortInfo({ onCallback }) {
  const [text] = useQueryParam("text", StringParam)

  const classes = useStyles()
  const [shortInfo, setShortInfo] = useState({ ...shortInfoObj, name: text })

  const onSearch = e => {
    setShortInfo({ ...shortInfo, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    onCallback(shortInfo)
  }, [shortInfo])

  return (
    <List
      subheader={<ListSubheader>Поиск по краткай информации</ListSubheader>}
      className={classes.root}
    >
      {searchShortInfo.map(({ icon, name, type, label }, ind) => (
        <ListItem key={ind}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            className={classes.label}
            id="switch-list-label-wifi"
            primary={label}
          />
          <ListItemSecondaryAction>
            <TextField
              name={name}
              onChange={e => onSearch(e)}
              id="standard-basic"
              type={type}
              value={shortInfo[name]}
              label={label}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
