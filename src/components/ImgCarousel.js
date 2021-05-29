import React from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  size: {
    width: 'auto !important',
    maxHeight: '300px',
  }
}))

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

export default function ImgCarousel ({imgs=[]}) {
  const classes = useStyles()

  return (
    <Slider {...settings}>
      {imgs.map((img, ind) => (
        <img className={classes.size} src={img} key={ind} />
      ))}
    </Slider>
  )
}

