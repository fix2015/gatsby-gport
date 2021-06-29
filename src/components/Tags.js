import React from "react"

import Grid from "@material-ui/core/Grid"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"

import { generateEditOptionsIcons } from "@services/options"

const useStyles = makeStyles(theme => ({
  tags: {
    textDecoration: "none",
    color: "#1976d2",
  },
}))

export default function Tags({ options }) {
  const classes = useStyles()

  const optionParams = generateEditOptionsIcons(options)

  return (
    <Grid container justify={"center"} spacing={3}>
      {optionParams
        .filter(option => {
          return option.value
        })
        .map(({ name, label }, ind) => (
          <Grid key={ind} item>
            <Link
              className={classes.tags}
              to={`/search?${name}=true`}
              state={{ fromFeed: true }}
            >
              #{label}
            </Link>
          </Grid>
        ))}
    </Grid>
  )
}
