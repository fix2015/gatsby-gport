import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import PhoneIcon from '@material-ui/icons/Phone'
import HomeIcon from '@material-ui/icons/Home'
import Grid from '@material-ui/core/Grid'

import ListOfOptions from '@components/Edit/ShortDescription/ListOfOptions'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}))

export default function Index({ options = [], onCallback, phone = '', address = '' }) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List subheader={<ListSubheader>Краткая информация:</ListSubheader>} className={classes.root}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <TextField value={address} id="standard-basic" label="Адрес" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <TextField value={phone} id="standard-basic" label="Телефон" />
            </ListItem>
            <ListItem>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      {options.length && <ListOfOptions onCallback={onCallback} options={options} />}
    </>
  )
}
