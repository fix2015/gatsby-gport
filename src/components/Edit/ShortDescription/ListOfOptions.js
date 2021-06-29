import React, { useEffect, useState } from "react"

import Switch from "@material-ui/core/Switch"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { generateEditOptionsIcons } from "@services/options"
import { optionsIcons } from "@src/Constants"

export default function ShortDescription({ options, onCallback }) {
  const [optionSaved, setOptionSaved] = useState(options)
  const [optionParams, setOptionParam] = useState(
    generateEditOptionsIcons(options)
  )

  const handleChange = event => {
    if (!event.target.checked) {
      setOptionSaved(
        // optionSaved.filter(option => option.name !== event.target.name)
        optionSaved.filter(option => option !== event.target.name)
      )
    } else {
      const { name, label } = optionsIcons.filter(
        optionIcon => optionIcon.name === event.target.name
      )[0]
      setOptionSaved(optionSaved.concat(name))
    }
  }

  useEffect(() => {
    setOptionParam(generateEditOptionsIcons(optionSaved))
    onCallback({ options: optionSaved })
  }, [optionSaved])

  return (
    <FormGroup row>
      {optionParams.map(({ name, icon, label, value }, ind) => (
        <FormControlLabel
          key={ind}
          control={
            <Switch
              name={name}
              onChange={handleChange}
              checked={value}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label={icon}
          labelPlacement="start"
        />
      ))}
    </FormGroup>
  )
}
