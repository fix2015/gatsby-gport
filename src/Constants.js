import HomeIcon from '@material-ui/icons/Home'
import HttpIcon from '@material-ui/icons/Http'
import RoomIcon from '@material-ui/icons/Room'
import PaymentIcon from '@material-ui/icons/Payment'
import PhoneIcon from '@material-ui/icons/Phone'
import React from 'react'

export const GOOGLE_API = "AIzaSyDBlFmip6tAQanrEpIi3JAjakmu3QY5PEI"

export const TABS = [`description`, `map`, `reviews`]

export const MODEL = {
  name: "",
  alias: "",
  phone: "",
  price: 0,
  address: "",
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  type: 0,
  position: {
    lat: 0,
    lng: 0,
  },
  imgs: [
  ],
  options: [

  ],
}

export const TYPE = [
  {
    name : 'Частный сектор',
    id: 0,
    alias: 'private_sector'
  },
  {
    name : 'Пансионаты',
    id: 1,
    alias: 'pansionat'
  },
  {
    name : 'Отель',
    id: 2,
    alias: 'otel'
  },
  {
    name : 'Гостиницы',
    id: 3,
    alias: 'hotel'
  },
  {
    name : 'Санатории',
    id: 4,
    alias: 'sanatoriums'
  },
  {
    name : 'База отдыха',
    id: 5,
    alias: 'recreation_center'
  },
  {
    name : 'Квартиры',
    id: 6,
    alias: 'flat'
  },
  {
    name : 'Дачи',
    id: 7,
    alias: 'cottages'
  },
]

export const SHORT_INFO = [
  {
    label: 'Название',
    icon:  <HomeIcon />,
    name: 'name',
    type: 'string',
  },
  {
    label: 'Alias',
    icon:  <HttpIcon />,
    name: 'alias',
    type: 'string',
  },
  {
    label: 'Адрес',
    icon:  <RoomIcon />,
    name: 'address',
    type: 'string',
  },
  {
    label: 'Цена',
    icon:  <PaymentIcon />,
    name: 'price',
    type: 'number',
  },
  {
    label: 'Телефон',
    icon:  <PhoneIcon />,
    name: 'phone',
    type: 'number',
  },
]
