import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Typography, Box, Button, Container, IconButton, Toolbar } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../src/theme';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    root: {
      flexGrow: 1,
    },
    container:{
      marginTop: theme.spacing(12),
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1
    }
  }
))

export default function Main(props) {
  const classes = useStyles();

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
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppBar>
          <Container>
            <Toolbar>
              {/*<MenuIcon />*/}
              <IconButton className={classes.menuButton} edge={'start'} color={'inherit'} aria-label={'menu'}></IconButton>
              <Typography className={classes.title} variant={"h6"}>test</Typography>
              <Box mr={3}>
                <Button color={"inherit"} variant={"outlined"}>Log in</Button>
              </Box>
              <Button color={"secondary"} variant={"contained"}>Sign up</Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container className={classes.container}>
          {props.children}
        </Container>
      </ThemeProvider>
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};
