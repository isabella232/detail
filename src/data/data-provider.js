const data = require('./parsed.json')

export function getCountries () {
  return Object.keys(data.children)
}

export function getCamps (country) {
  return Object.keys(data.children[country].children)
}

export function getSchools (country, camp) {
  return Object.keys(data.children[country].children[camp].children)
}

export function getLessons (country, camp, school) {
  let values = data.values
  if (country) {
    values = data.children[country].values
  }
  if (camp) {
    values = data.children[country].children[camp].values
  }
  if (school) {
    values = data.children[country].children[camp].children[school].values
  }

  return {
    months: Object.keys(values),
    lessons: Object.values(values)
  }
}
