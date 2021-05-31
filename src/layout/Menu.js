import React, { useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {TYPE} from '@src/Constants';
import { Link } from 'gatsby'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

export default function Menu({anchor='left', open, onToogleMenu}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    setState({ ...state, [anchor]: open });
  }, [open])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    onToogleMenu(open);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {TYPE.map((type, ind) => (
          <Link className={classes.link} to={`/type/${type.alias}`} state={{ fromFeed: false }} key={ind}>
            <ListItem button>
              <ListItemIcon><RadioButtonUncheckedIcon /></ListItemIcon>
              <ListItemText primary={type.name} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
          <Link className={classes.link} to={`/place-edit/new`} state={{ fromFeed: false }}>
            <ListItem button>
              <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
              <ListItemText primary={'Добавить жилье'} />
            </ListItem>
          </Link>
      </List>
    </div>
  );

  return (
    <React.Fragment key={anchor}>
      <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
