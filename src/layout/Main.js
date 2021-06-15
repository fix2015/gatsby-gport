import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  AppBar,
  Box,
  Button,
  Container,
  fade,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'gatsby'
import InputBase from '@material-ui/core/InputBase'
import { AccountCircle } from '@material-ui/icons'
import firebase from 'gatsby-plugin-firebase'
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

import MenuSide from './Menu/Side'
import MenuProfile from './Menu/Profile'
import theme from '@src/theme'
import { UserContext } from '@hoc/user'
import {USER_MODEL} from '@src/Constants'

const useStyles = makeStyles(theme => ({
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
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function Main(props) {
  const classes = useStyles()
  const [openMenuSide, setOpenMenuSide] = useState(false)
  const [openMenuProfile, setOpenMenuProfile] = useState(false)
  const [search, setSearch] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [userContextData, setUserContextData] = useState(USER_MODEL);

  useEffect(() => {
    if (user) {
      console.log(user)
      setUserContextData({
        email: user.email,
        uid: user.uid,
      })
    }else{
      setUserContextData(USER_MODEL)
    }
  }, [user])

  const onSearch = e => {
    setSearch(e.target.value)
  }

  const onCloseMenuProfile = (e) => {
    setOpenMenuProfile(false);
  };

  const onOpenProfileSide = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenuProfile(true);
  };

  const onCloseMenuSide = () => {
    setOpenMenuSide(false);
  };

  const onOpenMenuSide = () => {
    setOpenMenuSide(true);
  };

  return (
    <UserContext.Provider value={userContextData}>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
              <IconButton
                onClick={onOpenMenuSide}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Box className={classes.title}>
                <Link to={'/'} state={{ fromFeed: false }}>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  >
                    <HomeIcon className={classes.main} />
                  </IconButton>
                </Link>
              </Box>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={search}
                  onChange={e => onSearch(e)}
                />
              </div>
              <Box mr={1}>
                <Link
                  to={`/search?name=${search}`}
                  className={classes.main}
                  state={{ fromFeed: false }}
                >
                  <Button color={'secondary'} variant={'contained'}>
                    Поиск
                  </Button>
                </Link>
              </Box>
              <Link
                to={'/place-edit/new'}
                className={classes.main}
                state={{ fromFeed: false }}
              >
                <Button color={'inherit'} variant={'outlined'}>
                  Добавить жилье
                </Button>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={onOpenProfileSide}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Container className={classes.container}>{props.children}</Container>
        <MenuSide open={openMenuSide} onClose={onCloseMenuSide} />
        <MenuProfile anchorEl={anchorEl} open={openMenuProfile} onClose={onCloseMenuProfile}/>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

Main.propTypes = {
  children: PropTypes.node,
}
