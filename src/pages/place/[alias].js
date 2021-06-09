import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DescriptionIcon from '@material-ui/icons/Description'
import MapIcon from '@material-ui/icons/Map'
import PersonPinIcon from '@material-ui/icons/PersonPin'
// import { useCollection } from 'react-firebase-hooks/firestore';
// import firebase from 'gatsby-plugin-firebase'

import TabPanel from '@components/TabPanel'
import ShortDescription from '@components/View/ShortDescription'
import ImgCarousel from '@components/ImgCarousel'
import GoogleMap from '@components/View/GoogleMap'
import { MODEL } from '@src/Constants'
import { getByAlias } from '@api/place'
import Description from '@components/View/Description'
import firebase from 'gatsby-plugin-firebase'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import CircularProgress from '@material-ui/core/CircularProgress'
import PlaceList from '../../components/place-list'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  slider: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function Place({ alias }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [db] = useState(firebase.firestore())
  const [placeData, loading, error] = useCollectionData(
    db.collection('places').where('alias', '==', alias),
  )
  const [place, setPlace] = useState({})

  useEffect(() => {
    if(!loading && !error){
      setPlace(alias ? placeData[0] : MODEL)
    }
  }, [placeData, loading, error])

  const { name, position, description, imgs } = place;

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log(place)

  return (
    <div className={classes.root}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      {place &&
      (
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} xs={12}>
            <Paper className={classes.slider}>
              <ImgCarousel imgs={imgs} />
            </Paper>
          </Grid>
          <Grid item lg={5} md={5} xs={12}>
            <Paper className={classes.paper}>
              <ShortDescription key={place.name} {...place} />
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
                <Description description={description} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GoogleMap name={name} position={position} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                Page Three
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>)
      }
    </div>
  )
}
