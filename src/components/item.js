import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import EditIcon from "@material-ui/icons/Edit"
import IconButton from "@material-ui/core/IconButton"
import CardHeader from "@material-ui/core/CardHeader"
import { useQueryParam, StringParam } from "use-query-params"
import { Link, navigate } from "gatsby"

import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

import ListOfOptions from "@components/ListOfOptions"
import theme from "../theme"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    width: "100%",
  },
  media: {
    height: 140,
  },
  underline: {
    textDecoration: "none",
  },
  name: {
    display: 'inline-block',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
    color: theme.palette.action.active,
  },
}))

const Item = ({ item }) => {
  const classes = useStyles()
  const [adminMode] = useQueryParam("admin", StringParam)

  const onEdit = alias => {
    navigate(`/place-edit/${alias}`)
  }

  // function renderImage({ images }) {
  //   return <CardMedia
  //     title={item.name}
  //   >
  //     <Img className={classes.media} fluid={images.nodes[0].localFile.childrenImageSharp[0].fluid} />
  //   </CardMedia>
  // }

  return (
    <Card className={classes.root}>
      <Link
        to={`/place/${item.alias}`}
        className={classes.underline}
        state={{ fromFeed: true }}
      >
        {adminMode && (
          <CardHeader
            action={
              <IconButton
                onClick={() => onEdit(item.alias)}
                aria-label="settings"
              >
                <EditIcon />
              </IconButton>
            }
          />
        )}

        <CardMedia
          className={classes.media}
          image={item.imgs[0]}
          title={item.name}
        />

        <CardContent>
          <Typography
            gutterBottom
            className={classes.name}
            variant="h6"
            component="h2"
          >
            {item.name}
          </Typography>
          <Typography noWrap variant="body2" color="textSecondary">
            Цена - {item.price} грн
          </Typography>
          <Typography noWrap variant="body2" color="textSecondary">
            До моря - {item.distance} м
          </Typography>
        </CardContent>
        <CardActions>
          <ListOfOptions options={item.options} />
        </CardActions>
      </Link>
    </Card>
  )
}

// <StaticQuery
//   query={graphql`
// query AllImagesQuery {
//   images: allS3Object(filter: {url: {regex: "/.*i6l6zayax.*/"}}, limit: 1) {
//     nodes {
//       Key
//       url
//       localFile {
//         url
//         childrenImageSharp {
//           fluid {
//           ...GatsbyImageSharpFluid
//           }
//           fixed(width: 125, height: 125) {
//           ...GatsbyImageSharpFixed
//         }
//         }
//       }
//     }
//   }
// }
//
//         `}
//   render={renderImage}
// />

export default Item;



