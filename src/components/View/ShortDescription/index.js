import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListSubheader from "@material-ui/core/ListSubheader"
import Grid from "@material-ui/core/Grid"

import ListOfOptions from "@components/ListOfOptions"
import { SHORT_INFO } from "@src/Constants"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function Index({
  options = [],
  phone = "",
  address = "",
  price = "",
  type = "",
  name = "",
  alias = "",
}) {
  const classes = useStyles()

  const [place] = useState({ phone, address, price, type, alias, name })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List
            subheader={<ListSubheader>Краткая информация:</ListSubheader>}
            className={classes.root}
          >
            {SHORT_INFO.map(({ name, type, icon, label }, ind) => (
              <ListItem key={ind}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={place[name]} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <ListOfOptions options={options} />
    </>
  )
}
