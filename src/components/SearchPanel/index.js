import React, { useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid } from "@material-ui/core"

import ShortInfo from "./ShortInfo"
import Options from "./Options"
import Paper from "@material-ui/core/Paper"
import useDebounce from "@services/debounce"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    textAlign: "right",
  },
}))

export default function Index({ onCalback }) {
  const classes = useStyles()
  const [search, setSearch] = useState({})
  const [searchShortInfo, setSearchShortInfo] = useState({})
  const [searchOptionInfo, setSearchOptionInfo] = useState({})
  const [startSearch, setStartSearch] = useState(true)

  const onShortInfoSearch = shortInfo => {
    setSearchShortInfo({ ...searchShortInfo, ...shortInfo })
  }

  const onOptionsSearch = options => {
    setSearchOptionInfo({ ...searchOptionInfo, ...options })
  }

  const debouncedSearchTerm = useDebounce(search, 500)

  useEffect(() => {
    if (!Object.keys(search).length || !startSearch) return

    onCalback(search)
    setStartSearch(false)
  }, [debouncedSearchTerm])

  useEffect(() => {
    setSearch({ ...searchShortInfo, ...searchOptionInfo })
  }, [searchShortInfo, searchOptionInfo])

  return (
    <Grid container spacing={3} ustify={"flex-start"}>
      <Grid item lg={6} md={6} xs={12}>
        <Paper square className={classes.root}>
          <ShortInfo onCallback={onShortInfoSearch} />
        </Paper>
      </Grid>
      <Grid item lg={6} md={6} xs={12}>
        <Paper square className={classes.root}>
          <Options onCallback={onOptionsSearch} />
        </Paper>
      </Grid>
      <Grid className={classes.button} item xs={12}>
        <Button
          onClick={() => onCalback(search)}
          color={"secondary"}
          variant={"contained"}
        >
          Поиск
        </Button>
      </Grid>
    </Grid>
  )
}
