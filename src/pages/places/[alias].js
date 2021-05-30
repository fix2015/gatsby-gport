import React, { useState } from 'react'
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
import { TABS, MODEL } from '@src/Constants';

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

export default function Place() {
  const classes = useStyles();
  const [place, setPlace] = useState(MODEL);
  const {description, imgs} = place;
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
  );
}

