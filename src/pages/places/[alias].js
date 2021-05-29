import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DescriptionIcon from '@material-ui/icons/Description';
import MapIcon from '@material-ui/icons/Map';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import TabPanel from '../../components/TabPanel';
import ShortDescription from '../../components/ShortDescription';
import ImgCarousel from '../../components/ImgCarousel';
import GoogleMap from '../../components/GoogleMap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  slider: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // padding: '100px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const placeModel = {
  name: 'Pansionat',
  phone: '123456789',
  address: 'Железный порт',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  imgs: [
    'https://source.unsplash.com/user/erondu/1600x900',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
  ],
  options: [
    {
      name: 'Душ в номере',
      icon: 'shower',
    },
    {
      name: 'Бассейн',
      icon: 'pool',
    },
    {
      name: 'Wifi',
      icon: 'wifi',
    },
    {
      name: 'Детская площадка',
      icon: 'playground',
    },
  ],
}

export default function Place() {
  const classes = useStyles();
  const {description, imgs} = placeModel;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Paper className={classes.slider}>
            <ImgCarousel imgs={imgs} />
          </Paper>
        </Grid>
        <Grid item lg={6} md={6}  xs={12}>
          <Paper className={classes.paper}>
            <ShortDescription {...placeModel} />
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
  );
}

