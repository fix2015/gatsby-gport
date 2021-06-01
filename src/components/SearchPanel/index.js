import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

import ShortInfo from './ShortInfo';
import Options from './Options';
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Index({onCalback}) {
  const classes = useStyles();
  const [search, setSearch] = useState({})


  const onShortInfoSearch = (shortInfo) => {
    setSearch({...search, ...shortInfo})
  }

  const onOptionsSearch = (options) => {
    setSearch({...search, ...options})
  }

  useEffect(() => {
    onCalback(search)
  }, [search])

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={6} xs={12} >
        <Paper square className={classes.root}>
          <ShortInfo onCallback={onShortInfoSearch} />
        </Paper>
      </Grid>
      <Grid item lg={6} md={6} xs={12} >
        <Paper square className={classes.root}>
          <Options onCallback={onOptionsSearch}/>
        </Paper>
      </Grid>
    </Grid>
  );
}
