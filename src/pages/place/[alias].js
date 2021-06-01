import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import DescriptionIcon from "@material-ui/icons/Description"
import MapIcon from "@material-ui/icons/Map"
import PersonPinIcon from "@material-ui/icons/PersonPin"

import TabPanel from "@components/TabPanel"
import ShortDescription from "@components/View/ShortDescription"
import ImgCarousel from "@components/ImgCarousel"
import GoogleMap from "@components/GoogleMap"
import { MODEL } from "@src/Constants"
import { getByAlias } from "@api/place"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  slider: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

export default function Place({alias}) {
  const classes = useStyles()
  const [place] = useState(alias ? getByAlias(alias) : MODEL)
  const { description, imgs } = place
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={7} md={7} xs={12}>
          <Paper className={classes.slider}>
            <ImgCarousel imgs={imgs} />
          </Paper>
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Paper className={classes.paper}>
            <ShortDescription {...place} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<DescriptionIcon />} label="Описания" />
              <Tab icon={<MapIcon />} label="Карта" />
              <Tab icon={<PersonPinIcon />} label="Отзывы" />
            </Tabs>
            <TabPanel value={value} index={0}>
              {description}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <GoogleMap />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Page Three
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
