import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DescriptionIcon from '@material-ui/icons/Description'
import MapIcon from '@material-ui/icons/Map'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import { useQueryParam, StringParam } from 'use-query-params'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Fab from '@material-ui/core/Fab'
import { navigate } from 'gatsby'
import firebase from 'gatsby-plugin-firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import TabPanel from '@components/TabPanel'
import ShortDescription from '@components/Edit/ShortDescription'
import GoogleMap from '@components/Edit/GoogleMap'
import Description from '@components/Edit/Description'
import PhotoUploader from '@components/Edit/PhotoUploader'
import { TABS, COLLECTION, DOC, MODEL } from '@src/Constants'
import { uploadImg, deleteImg } from '@services/s3'
import { UserContext } from '@hoc/user'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  save: {
    position: 'fixed',
    zIndex: 100,
    right: '20px',
    bottom: '20px',
  },
  delete: {
    position: 'fixed',
    zIndex: 100,
    right: '90px',
    bottom: '20px',
  },
}))

export default function Place({ alias }) {
  const classes = useStyles();
  const [db] = useState(firebase.firestore());
  const [place, setPlace] = useState(MODEL);
  const { description, position, name } = place;
  const [activeTab] = useQueryParam('tab', StringParam);
  const defaultTab = TABS.includes(activeTab) ? activeTab : TABS[0];
  const [value, setValue] = useState(defaultTab);
  const [isPlaceReady, setIsPlaceReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [newPlace, setNewPlace] = useState(false);
  const [loading, setLoading] = useState(false);
  const userContextData = useContext(UserContext);

  const createCollection = ({place}) => {
    if (!userContextData.uid) navigate('/');

    delete place.documentId;
    place.uid = userContextData.uid;

    return db.collection(COLLECTION).doc().set({...place, imgs: []});
  }

  const updateCollection = ({documentId, place}) => {
    if (!userContextData.uid) navigate('/');

    delete place.documentId;
    place.uid = userContextData.uid;

    return db.collection(COLLECTION).doc(documentId).set(place);
  }

  const deleteCollection = (documentId) => {
    return db.collection(COLLECTION).doc(documentId).delete();
  }

  const getByAlias = (alias) => {
    return db.collection(COLLECTION).where('alias', '==', alias);
  }

  const getByName = (name) => {
    return db.collection(COLLECTION).where('name', '==', name);
  }

  const isDublicate = ({name, alias}) => {
    return Promise.all([
      db.collection(COLLECTION).where("alias", "==", alias).get().then(doc => {
        return doc.empty;
      }),
      db.collection(COLLECTION).where("name", "==", name).get().then(doc => {
        return doc.empty;
      })
    ])
      .then( ( [ one, two ] ) => {
        return Promise.resolve(one && two);
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const ref = getByAlias(alias);

  const loadFormatData = (ref) => {
    return new Promise((res, rej) => {
      ref.get()
        .then(snapshot => {
          if (snapshot.empty) {
            setNewPlace(true);
            rej();
          }
          snapshot.forEach(doc => {
            res({
              ...doc.data(),
              documentId: doc.id,
            })
          });
        })
        .catch(err => {
          setErrorMessage('Error getting documents');
          rej();
        });
    })
  }

  useEffect(async () => {
    try{

      const data = await loadFormatData(ref);
      setPlace(data);
    }catch (e){
      setPlace(MODEL);
    }

    setLoading(false);
  }, [])

  useEffect(async () => {
    setErrorMessage(null);
    if(!userContextData.uid) setErrorMessage('Чтобы создать обьявления, Вам нужно пройти авторизацию');
  }, [userContextData])

  const saveButton = {
    icon: <AddCircleIcon />,
    color: 'secondary',
    label: 'Сохранить',
    className: classes.save,
    disabled: true,
  }

  const deleteButton = {
    icon: <DeleteForeverIcon />,
    color: 'primary',
    label: 'Delete',
    className: classes.delete,
    disabled: false,
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const onGetPosition = position => {
    setPlace({ ...place, position });
  }

  const onModelChange = description => {
    setPlace({ ...place, description });
  }

  const onShortDescriptionChanges = info => {
    setPlace({ ...place, ...info });
  }

  const onAddImg = imgs => {
    setPlace({ ...place, imgs: [...place.imgs, ...imgs] });
  }

  const onDeleteImg = async (fileName, documentId) => {
    try {
      await deleteImg(fileName, documentId);

      setPlace({
        ...place,
        imgs: [
          ...place.imgs.filter(placeImg => placeImg.search(fileName) === -1),
        ],
      })
    } catch (e) {
      setErrorMessage('Error on delete img')
      console.error(e)
    }
  }

  const uploadImgs = (imgs, folder) => {
    const promises = [];
    imgs.forEach(img => {
      if (img instanceof File) promises.push(uploadImg(img, folder));
    })

    return Promise.all(promises).then(data => {
      return Promise.resolve(data.map(img => img.location));
    })
  }

  const updatePlace = async () => {
    try{
      const { documentId, imgs } = place;

      const awsSrc = await uploadImgs(imgs, documentId);
      if (awsSrc.length) {
        await updateCollection({documentId, place: Object.assign(place, { imgs: awsSrc })});
      } else {
        await updateCollection({documentId, place});
      }

      return true;
    }catch (e){
      setLoading(false);
      console.error(e)
    }
  }

  const createPlace = async () => {
    try{
      const isValidData = await isDublicate(place);
      if(!isValidData) return Promise.reject('Dublicate alias or name');

      setLoading(true);
      let { imgs, alias } = place;
      await createCollection({place: {...place, imgs: []}});
      let responce = await loadFormatData(getByAlias((alias)));
      const {documentId} = responce;

      const awsSrc = await uploadImgs(imgs, documentId);
      if (awsSrc.length) {
        await updateCollection({documentId, place: Object.assign(place, { imgs: awsSrc})});
      }
      setLoading(false);

      return true;
    }catch (e){
      setLoading(false);
      console.error(e)
      // setErrorMessage(e.toString());
    }
  }

  const deletePlace = async (documentId) => {
    try{
      setLoading(true);
      let { imgs } = place;
      const promises = [];
      imgs.forEach((img) => {
        promises.push(onDeleteImg(img, documentId));
      })
      await Promise.all(promises)
      const data = await deleteCollection(documentId);
      setLoading(false);

      return navigate('/');
    }catch (err){
      setLoading(false);
      console.error(err)
      setErrorMessage('Сервер не может удалить ваше жилье');
    }
  }

  const savePlace = async () => {
    try {
      setLoading(true);
      const { documentId } = place;

      if (documentId) {
        await updatePlace();
      } else {
        await createPlace();
      }
      setLoading(false);

      navigate('/');
    } catch (e) {
      setErrorMessage(e)
      setLoading(false);
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(place);

    const { address, phone, price, imgs } = place;

    setIsPlaceReady(
      !(name.length && address.length && phone.length && price.length && imgs.length),
    )
  }, [place])


  return (
    <div className={classes.root}>
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {place &&
      (
        <>
          <Fab
            onClick={savePlace}
            disabled={isPlaceReady}
            aria-label={saveButton.label}
            className={classes.save}
            color={saveButton.color}
          >
            {saveButton.icon}
          </Fab>
          <Fab
            onClick={() => deletePlace(place.documentId)}
            disabled={newPlace}
            aria-label={deleteButton.label}
            className={classes.delete}
            color={deleteButton.color}
          >
            {deleteButton.icon}
          </Fab>
          <Grid container spacing={3}>
            <Grid item lg={7} md={7} xs={12}>
              <Paper className={classes.slider}>
                <PhotoUploader
                  {...place}
                  onDeleteImg={onDeleteImg}
                  onAddImg={onAddImg}
                />
              </Paper>
            </Grid>
            <Grid item lg={5} md={5} xs={12}>
              <Paper className={classes.paper}>
                <ShortDescription
                  key={place.documentId}
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
        </>)}
    </div>
  )
}
