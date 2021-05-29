import BathtubIcon from '@material-ui/icons/Bathtub';
import WifiIcon from '@material-ui/icons/Wifi';
import PoolIcon from '@material-ui/icons/Pool';
import ChildCareIcon from '@material-ui/icons/ChildCare';

const optionsIcons = {
  shower: BathtubIcon,
  wifi: WifiIcon,
  pool: PoolIcon,
  playground: ChildCareIcon,
}



export const generateOptionsIcons = (options) => {
  options.map(({icon}, ind) => options[ind].Component = optionsIcons[icon]);

  return options;
}
