import React from 'react'
import { Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import Item from './item'

export default function PlaceList({ items, hasMore, fetchMoreData }) {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      style={{
        overflow: 'hidden'
      }}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {items.map((item, ind) => (
          <Grid
            justify="center"
            container
            key={ind}
            item
            xs={12}
            md={4}
            sm={6}
            lg={3}
          >
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
