const { loadSvgFile, writeJsonFile } = require('./utils/file')
const { parseLine, parseStation, parseStationEx } = require('./core/parse')
const css2json = require('css2json')

async function init(filename) {
  const data = await loadSvgFile(`${filename}.svg`)
  const svg = data.svg.g
  const viewBox = data.svg.$.viewBox.split(' ')
  const css = data.svg.defs[0]['style'][0]
  const style = css2json(css)

  const json = {
    title: data.svg.title[0],
    width: viewBox[3],
    height: viewBox[4],
    line: [],
    station: []
  }

  svg.forEach(item => {
    const id = item['$']['id']
    if (id === 'line') {
      json['line'] = parseLine(item, style)
    }
    if (id === 'station') {
      json['station'] = json['station'].concat(parseStation(item))
    }
    if (id === 'station-ex') {
      json['station'] = json['station'].concat(parseStationEx(item))
    }
  })
  writeJsonFile(`${filename}.json`, json)
}

init('ningbo-subway')
