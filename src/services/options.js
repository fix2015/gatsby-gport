import BathtubIcon from "@material-ui/icons/Bathtub"
import WifiIcon from "@material-ui/icons/Wifi"
import PoolIcon from "@material-ui/icons/Pool"
import ChildCareIcon from "@material-ui/icons/ChildCare"

export const optionsIcons = [
  {
    name: "Бассейн",
    icon: "pool",
    Component: PoolIcon,
  },
  {
    name: "Wifi",
    icon: "wifi",
    Component: WifiIcon,
  },
  {
    name: "Детская площадка",
    icon: "playground",
    Component: ChildCareIcon,
  },
  {
    name: "Душ в номере",
    icon: "shower",
    Component: BathtubIcon,
  },
]

export const generateOptionsIcons = options => {
  options.map(
    ({ icon }, ind) =>
      (options[ind].Component = optionsIcons.filter(
        option => option.icon === icon
      )[0].Component)
  )

  return options
}

export const generateEditOptionsIcons = options => {
  return optionsIcons.map(({ name, icon, Component }) => {
    return {
      name: name,
      Component: Component,
      value: options.map(({ icon }) => icon).includes(icon),
      icon: icon,
    }
  })
}
