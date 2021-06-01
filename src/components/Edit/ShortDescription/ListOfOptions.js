import React, { useEffect, useState } from "react"

import Switch from "@material-ui/core/Switch"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { generateEditOptionsIcons, optionsIcons } from "@services/options"

export default function ShortDescription({ options, onCallback }) {
  const [optionSaved, setOptionSaved] = useState(options)
  const [optionParams, setOptionParam] = useState(
    generateEditOptionsIcons(options)
  )

  const handleChange = event => {
    if (!event.target.checked) {
      setOptionSaved(
        optionSaved.filter(option => option.icon !== event.target.name)
      )
    } else {
      const { name, icon } = optionsIcons.filter(
        optionIcon => optionIcon.icon === event.target.name
      )[0]
      setOptionSaved(optionSaved.concat({ name, icon }))
    }
  }

  useEffect(() => {
    setOptionParam(generateEditOptionsIcons(optionSaved))
    onCallback({options: optionSaved})
  }, [optionSaved])

  return (
    <FormGroup row>
      {optionParams.map(({ name, icon, Component, value }, ind) => (
        <FormControlLabel
          key={ind}
          control={
            <Switch
              name={icon}
              onChange={handleChange}
              checked={value}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label={<Component />}
          labelPlacement="start"
        />
      ))}
    </FormGroup>
  )
}
