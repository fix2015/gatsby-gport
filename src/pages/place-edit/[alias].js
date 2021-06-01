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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab'
import { navigate } from 'gatsby';

import TabPanel from "@components/TabPanel"
import ShortDescription from "@components/Edit/ShortDescription"
import GoogleMap from "@components/Edit/GoogleMap"
import Description from "@components/Edit/Description"
import PhotoUploader from "@components/Edit/PhotoUploader"
import { TABS, MODEL } from "@src/Constants"
import { uploadImg, deleteImg } from '@services/s3'
import { post, getByAlias, put } from '@api/place'

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
  save: {
    position: 'fixed',
    zIndex: 100,
    right: '20px',
    bottom: '20px'
  }
}))

export default function Place({alias}) {
  const classes = useStyles()
  const [place, setPlace] = useState(alias ? getByAlias(alias) : MODEL)
  const { description, id, position, name, imgs } = place
  const [activeTab] = useQueryParam("tab", StringParam)
  const defaultTab = TABS.includes(activeTab) ? activeTab : TABS[0]
  const [value, setValue] = React.useState(defaultTab)
  const [isPlaceReady, setIsPlaceReady] = React.useState(false)

  const saveButton = {
    icon: <AddCircleIcon />,
    color: 'secondary',
    label: 'Сохранить',
    className: classes.save,
    disabled: true,
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onGetPosition = position => {
    setPlace({ ...place, position })
  }

  const onModelChange = description => {
    setPlace({ ...place, description })
  }

  const onShortDescriptionChanges = info => {
    setPlace({ ...place, ...info })
  }

  const onAddImg = imgs => {
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

  const uploadImgs = (imgs, folder) => {
    const promises = [];
    imgs.forEach((img) => {
      if(img instanceof File) promises.push(uploadImg(img, folder))
    })

    return Promise.all(promises)
      .then((data) => {
        return Promise.resolve(data.map((img) => img.location));
      })
  }

  const updatePlace = async () => {
    let responce = [];
    const {id, imgs} = place;

    const awsSrc = await uploadImgs(imgs, id);
    if(awsSrc.length){
      responce = await put(Object.assign(place, {imgs: awsSrc}));
    }else{
      responce = await put(place);
    }

    return responce;
  }

  const createPlace = async () => {
    let {imgs} = place;

    let responce = await post(place);
    const id = responce.id;

    const awsSrc = await uploadImgs(imgs, id);
    if(awsSrc.length){
      responce = await put(Object.assign(place, {imgs: awsSrc}));
    }

    return responce;
  }

  const savePlace = async () => {
    try{
      let responce = [];
      const {id} = place;

      if(id){
        responce = await updatePlace();
      }else{
        responce = await createPlace();
      }
      setPlace(responce);
      console.log('save', responce)

      navigate('/');
    }catch (e){
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(place)

    const {name, address, phone, price} = place;

    setIsPlaceReady(!(name.length && address.length && phone.length && price.length));
    }, [place])

  return (
    <div className={classes.root}>
      <Fab onClick={savePlace} disabled={isPlaceReady} aria-label={saveButton.label} className={classes.save} color={saveButton.color}>
        {saveButton.icon}
      </Fab>
      <Grid container spacing={3}>
        <Grid item lg={7} md={7} xs={12}>
          <Paper className={classes.slider}>
            <PhotoUploader id={id} imgs={imgs} onDeleteImg={onDeleteImg} onAddImg={onAddImg} />
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
