import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListSubheader from "@material-ui/core/ListSubheader"
import Grid from "@material-ui/core/Grid"
import ApartmentIcon from "@material-ui/icons/Apartment"

import ListOfOptions from "@components/Edit/ShortDescription/ListOfOptions"
import TextField from "@material-ui/core/TextField"
import { TYPE, SHORT_INFO } from "@src/Constants"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

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
  type = "",
  name = "",
  alias = "",
}) {
  const classes = useStyles()

  const [place, setPlace] = useState({
    phone,
    address,
    price,
    type,
    alias,
    name,
  })

  const handleChange = e => {
    setPlace({ ...place, type: e.target.value })
  }

  useEffect(() => {
    onCallback(place)
  }, [place])

  const onChangeInfo = e => {
    setPlace({ ...place, [e.target.name]: e.target.value })
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
                <ApartmentIcon />
              </ListItemIcon>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={place.type}
                onChange={e => handleChange(e)}
              >
                {TYPE.map((type, ind) => {
                  return (
                    <MenuItem key={ind} name={type.name} value={type.id}>
                      {type.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </ListItem>

            {SHORT_INFO.map(({ name, type, icon, label }, ind) => (
              <ListItem key={ind}>
                <ListItemIcon>{icon}</ListItemIcon>
                <TextField
                  name={name}
                  onChange={e => onChangeInfo(e)}
                  defaultValue={place[name]}
                  id="standard-basic"
                  type={type}
                  label={label}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <ListOfOptions onCallback={onCallback} options={options} />
    </>
  )
}
