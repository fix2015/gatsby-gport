import HomeIcon from "@material-ui/icons/Home"
import HttpIcon from "@material-ui/icons/Http"
import RoomIcon from "@material-ui/icons/Room"
import PaymentIcon from "@material-ui/icons/Payment"
import PhoneIcon from "@material-ui/icons/Phone"
import React from "react"
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk"
import BathtubIcon from "@material-ui/icons/Bathtub"
import WifiIcon from "@material-ui/icons/Wifi"
import PoolIcon from "@material-ui/icons/Pool"
import ChildCareIcon from "@material-ui/icons/ChildCare"
import { StringParam, NumberParam } from "use-query-params"

export const TABS = [`description`, `map`, `reviews`]

export const USER_MODEL = {
  email: null,
  uid: null
}

export const MODEL = {
  name: "",
  uid: "",
  alias: "",
  phone: "",
  price: 0,
  distance: 0,
  address: "",
  description: ``,
  type: 0,
  position: {
    lat: 0,
    lng: 0,
  },
  imgs: [],
  options: [],
}

export const TYPE = [
  {
    name: "Частный сектор",
    id: 0,
    alias: "private_sector",
  },
  {
    name: "Пансионаты",
    id: 1,
    alias: "pansionat",
  },
  {
    name: "Отель",
    id: 2,
    alias: "otel",
  },
  {
    name: "Гостиницы",
    id: 3,
    alias: "hotel",
  },
  {
    name: "Санатории",
    id: 4,
    alias: "sanatoriums",
  },
  {
    name: "База отдыха",
    id: 5,
    alias: "recreation_center",
  },
  {
    name: "Квартиры",
    id: 6,
    alias: "flat",
  },
  {
    name: "Дачи",
    id: 7,
    alias: "cottages",
  },
]

export const SHORT_INFO = [
  {
    label: "Название",
    icon: <HomeIcon />,
    name: "name",
    type: "string",
    queryType: StringParam,
    search: true,
  },
  {
    label: "Alias",
    icon: <HttpIcon />,
    name: "alias",
    type: "string",
    queryType: StringParam,
    search: false,
  },
  {
    label: "До моря (м)",
    icon: <DirectionsWalkIcon />,
    name: "distance",
    type: "number",
    queryType: NumberParam,
    search: true,
  },
  {
    label: "Адрес",
    icon: <RoomIcon />,
    name: "address",
    type: "string",
    queryType: StringParam,
    search: true,
  },
  {
    label: "Цена",
    icon: <PaymentIcon />,
    name: "price",
    type: "number",
    queryType: NumberParam,
    search: true,
  },
  {
    label: "Телефон",
    icon: <PhoneIcon />,
    name: "phone",
    type: "number",
    queryType: NumberParam,
    search: true,
  },
]

export const GOOGLE_API = "AIzaSyDBlFmip6tAQanrEpIi3JAjakmu3QY5PEI"
export const COLLECTION = 'places'
export const DOC = 'place'

export const DEFAULT_MAP_PROPS = {
  center: {
    lat: 46.118849086724424,
    lng: 32.28825728930291,
  },
  zoom: 15,
}

export const optionsIcons = [
  {
    label: "Бассейн",
    name: "pool",
    icon: <PoolIcon />,
  },
  {
    label: "Wifi",
    name: "wifi",
    icon: <WifiIcon />,
  },
  {
    label: "Детская площадка",
    name: "playground",
    icon: <ChildCareIcon />,
  },
  {
    label: "Душ в номере",
    name: "shower",
    icon: <BathtubIcon />,
  },
]
