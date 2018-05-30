const { loadSvgFile, writeJsonFile } = require('./utils/file')
const { parseLine, parseStation, parseStationEx, parseText } = require('./core/parse')
const css2json = require('css2json')

async function init(filename) {
  const data = await loadSvgFile(`${filename}.svg`)
  const svg = data.svg.g
  const viewBox = data.svg.$.viewBox.split(' ')
  const css = data.svg.defs[0]['style'][0]
  const style = css2json(css)

  const json = {
    title: data.svg.title[0],
    width: parseFloat(viewBox[2]),
    height: parseFloat(viewBox[3]),
    lines: [],
    stations: [],
    texts: []
  }

  svg.forEach(item => {
    const id = item['$']['id']
    if (id === 'line') {
      json['lines'] = parseLine(item, style)
    }
    if (id === 'station') {
      json['stations'] = json['stations'].concat(parseStation(item))
    }
    if (id === 'station-ex') {
      json['stations'] = json['stations'].concat(parseStationEx(item))
    }
    if (id === 'text') {
      json['texts'] = parseText(item)
    }
  })
  writeJsonFile(`${filename}.json`, json)
}

init('ningbo-subway')
