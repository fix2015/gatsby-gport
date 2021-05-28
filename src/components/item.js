import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "gatsby"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Item({item, ind}) {
  const classes = useStyles();
  const openNewPlace = (id) => {

  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.src}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Lizard
          </Typography>
          <Typography noWrap variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={openNewPlace}>
          <Link
            to={`/places/${item.alias}`}
            state={{ fromFeed: true }}
          >
            View
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
