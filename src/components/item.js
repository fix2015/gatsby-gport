import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import CardHeader from '@material-ui/core/CardHeader'
import { useQueryParam, StringParam } from "use-query-params"
import { Link, navigate } from 'gatsby'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function Item({ item, ind }) {
  const classes = useStyles();
  const [adminMode] = useQueryParam("admin", StringParam)

  const onEdit = (alias) => {
    navigate(`/place-edit/${alias}`)
  }

  return (
    <Card className={classes.root}>
      <Link to={`/place/${item.alias}`} state={{ fromFeed: true }}>
        {adminMode && <CardHeader
          action={
            <IconButton onClick={() => onEdit(item.alias)} aria-label="settings">
              <EditIcon />
            </IconButton>
          }
        />}

        <CardMedia
          className={classes.media}
          image={item.imgs[0]}
          title={item.name}

        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {item.name}
          </Typography>
          <Typography
            noWrap
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {item.description.toString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Посмотреть
          </Button>
        </CardActions>
      </Link>
    </Card>
  )
}
