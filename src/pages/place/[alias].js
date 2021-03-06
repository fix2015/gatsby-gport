import React, { useContext, useEffect, useState } from "react"
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
import GoogleMap from "@components/View/GoogleMap"
import Review from "@components/View/Review"
import { MODEL, TABS } from "@src/Constants"
import Description from "@components/View/Description"
import firebase from "@services/db"
import { loadFormatDataOne, getByAlias } from "@api/place"
import { StringParam, useQueryParam } from "use-query-params"
import { updateCollection } from "@api/place"
import { LoadingContext } from "@hoc/loading"
import { ErrorMessageContext } from "@hoc/errorMessage"
import Tags from "@components/Tags"

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

export default function Place({ alias }) {
  const classes = useStyles()
  const [activeTab] = useQueryParam("tab", StringParam)
  const defaultTab = TABS.includes(activeTab) ? activeTab : TABS[0]
  const { loading, setLoading } = useContext(LoadingContext)
  const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext)
  const [value, setValue] = React.useState(defaultTab)
  const [db] = useState(firebase.firestore())
  const [place, setPlace] = useState({})

  useEffect(async () => {
    try {
      setErrorMessage("")
      setLoading(true)
      let place = await loadFormatDataOne(getByAlias(db, alias))
      setPlace(place)
      setLoading(false)
    } catch (e) {
      setErrorMessage(e)
      setLoading(false)
      setPlace(MODEL)
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onAddReview = async reviews => {
    try {
      const { documentId } = place
      const updatePlace = { ...place, reviews }
      await updateCollection(db, { documentId, place: { ...updatePlace } })
      setPlace(updatePlace)

      return true
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
  }

  const { name, reviews, options, position, description, imgs } = place

  return (
    <div className={classes.root}>
      {Object.keys(place).length ? (
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} xs={12}>
            <Paper className={classes.slider}>
              <ImgCarousel imgs={imgs} />
              <Tags options={options} />
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
                <Tab
                  value={`description`}
                  icon={<DescriptionIcon />}
                  label="????????????????"
                />
                <Tab value={`map`} icon={<MapIcon />} label="??????????" />
                <Tab
                  value={`reviews`}
                  icon={<PersonPinIcon />}
                  label="????????????"
                />
              </Tabs>
              <TabPanel value={value} index={TABS[0]}>
                <Description description={description} />
              </TabPanel>
              <TabPanel value={value} index={TABS[1]}>
                <GoogleMap name={name} position={position} />
              </TabPanel>
              <TabPanel value={value} index={TABS[2]}>
                <Review
                  reviews={reviews}
                  onCallback={onAddReview}
                  documentId={place.documentId}
                />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </div>
  )
}
