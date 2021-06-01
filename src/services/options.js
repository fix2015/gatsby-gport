import { optionsIcons } from "@src/Constants"

export const generateOptionsIcons = options => {
  options.map(
    ({ name }, ind) =>
      (options[ind].icon = optionsIcons.filter(
        option => option.name === name
      )[0].icon)
  )

  return options
}

export const generateEditOptionsIcons = options => {
  return optionsIcons.map(({ name, icon, label }) => {
    return {
      name: name,
      icon: icon,
      value: options.map(({ name }) => name).includes(name),
      label: label,
    }
  })
}
