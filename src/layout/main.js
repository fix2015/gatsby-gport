import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../src/theme'
import { makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'gatsby'

import Menu from './Menu'

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(12),
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    main: {
      color: '#ffffff',
      textDecoration: 'none'
    },
  }
))

export default function Main(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)


  const onOpenMenu = () => {
    setOpen(!open)
  }

  const onToogleMenu = (open) => {
    setOpen(open)
  }

  return (
    <>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Container>
            <Toolbar>
              <IconButton onClick={onOpenMenu} edge="start" className={classes.menuButton} color="inherit"
                          aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Box className={classes.title}>
                <Link to={'/'} state={{ fromFeed: false }}>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HomeIcon className={classes.main}/>
                  </IconButton>
                </Link>
              </Box>
              <Box mr={1}>
                <Link to={'/place-edit/new'} className={classes.main} state={{ fromFeed: false }}>
                  <Button color={'inherit'} variant={'outlined'}>Добавить жилье</Button>
                </Link>
              </Box>
              <Button color={'secondary'} variant={'contained'}>Авторизироваться</Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container className={classes.container}>
          {props.children}
        </Container>
        <Menu open={open} onToogleMenu={onToogleMenu} />
      </ThemeProvider>
    </>
  )
}

Main.propTypes = {
  children: PropTypes.node,
}
