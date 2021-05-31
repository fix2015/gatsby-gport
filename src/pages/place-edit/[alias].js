import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import DescriptionIcon from "@material-ui/icons/Description"
import MapIcon from "@material-ui/icons/Map"
import PersonPinIcon from "@material-ui/icons/PersonPin"
import { useQueryParam, StringParam } from "use-query-params"

import TabPanel from "@components/TabPanel"
import ShortDescription from "@components/Edit/ShortDescription"
import ImgCarousel from "@components/ImgCarousel"
import GoogleMap from "@components/Edit/GoogleMap"
import Description from "@components/Edit/Description"
import PhotoUploader from "@components/Edit/PhotoUploader"
import { TABS, MODEL } from "@src/Constants"
import { uploadImg, deleteImg } from '@services/s3'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  slider: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // padding: '100px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

export default function Place({model}) {
  const classes = useStyles()
  const [place, setPlace] = useState(model || MODEL)
  const { description, position, name, imgs } = place
  const [activeTab] = useQueryParam("tab", StringParam)
  const defaultTab = TABS.includes(activeTab) ? activeTab : TABS[0]
  const [value, setValue] = React.useState(defaultTab)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onGetPosition = position => {
    setPlace({ ...place, position })
  }

  const onModelChange = description => {
    setPlace({ ...place, description })
  }

  const onShortDescriptionChanges = options => {
    setPlace({ ...place, options })
  }

  const onAddImg = imgs => {
    // imgs.forEach((img) => {
    //   uploadImg(img)
    //     .then((data) => {
    //       console.log(data)
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //     })
    // })
    setPlace({ ...place, imgs: [...place.imgs, ...imgs] })
  }

  const onDeleteImg = async (img) => {
    try{
      await deleteImg(img);

      setPlace({ ...place, imgs: [...place.imgs.filter((placeImg) => placeImg!== img)] })
    }catch (e){
      console.error(e);
    }

  }

  useEffect(() => {
    console.log(place)
  }, [place])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={7} md={7} xs={12}>
          <Paper className={classes.slider}>
            <PhotoUploader imgs={imgs} onDeleteImg={onDeleteImg} onAddImg={onAddImg} />
          </Paper>
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Paper className={classes.paper}>
            <ShortDescription
              onCallback={onShortDescriptionChanges}
              {...place}
            />
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
                label="Описания"
              />
              <Tab value={`map`} icon={<MapIcon />} label="Карта" />
              <Tab value={`reviews`} icon={<PersonPinIcon />} label="Отзывы" />
            </Tabs>
            <TabPanel value={value} index={TABS[0]}>
              <Description
                onModelChange={onModelChange}
                description={description}
              />
            </TabPanel>
            <TabPanel value={value} index={TABS[1]}>
              <GoogleMap
                name={name}
                position={position}
                onCallback={onGetPosition}
              />
            </TabPanel>
            <TabPanel value={value} index={TABS[2]}>
              Page Three
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
