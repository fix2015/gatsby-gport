import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListSubheader from "@material-ui/core/ListSubheader"
import PhoneIcon from "@material-ui/icons/Phone"
import HomeIcon from "@material-ui/icons/Home"
import Grid from "@material-ui/core/Grid"
import PaymentIcon from '@material-ui/icons/Payment';
import ApartmentIcon from '@material-ui/icons/Apartment';

import ListOfOptions from "@components/Edit/ShortDescription/ListOfOptions"
import TextField from "@material-ui/core/TextField"
import {TYPE} from '@src/Constants'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}))

export default function Index({
  options = [],
  onCallback,
  phone = "",
  address = "",
  price = "",
  type = "0",
}) {
  const classes = useStyles();
  const handleChange = () => {

  }

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
              <TextField value={address} id="standard-basic" label="Адрес" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <TextField value={phone} id="standard-basic" label="Телефон" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <TextField value={price} id="standard-basic" label="Цена" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleChange}
              >
                {TYPE.map((type, ind) => {
                  return <MenuItem key={ind} value={type.id}>{type.name}</MenuItem>
                })}
              </Select>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <ListOfOptions onCallback={onCallback} options={options} />
    </>
  )
}
