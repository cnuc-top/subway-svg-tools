const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

fs.readFile(__dirname + '/file/ningbo-subway.svg', function(err, data) {
  parser.parseString(data, function(err, result) {
    parseSvg(result)
  })
})

function parseSvg(data) {
  const svg = data.svg.g
  svg.forEach(item => {
    const id = item['$']['id']
    if (id === 'line') {
      parseLine(item)
    }
  })
}

function parseLine(data) {
  const list = data.polyline
  const arr = []
  list.forEach(item => {
    item = item['$']
    let { id: name, points: path } = item
    name = name.replace('line-', '') + '号线'
    arr.push({
      name,
      path,
      class: item.class
    })
  })
}
