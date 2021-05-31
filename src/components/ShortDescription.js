import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import PhoneIcon from "@material-ui/icons/Phone"
import HomeIcon from "@material-ui/icons/Home"
import Grid from "@material-ui/core/Grid"

import ListOfOptions from "./ListOfOptions"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}))

export default function ShortDescription({
  options = [],
  phone = "",
  address = "",
}) {
  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List
            subheader={<ListSubheader>Краткая информация:</ListSubheader>}
            className={classes.root}
          >
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary={address} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary={phone} />
            </ListItem>
            <ListItem></ListItem>
          </List>
        </Grid>
      </Grid>
      {options.length && <ListOfOptions options={options} />}
    </>
  )
}
