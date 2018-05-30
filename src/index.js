const { loadSvgFile, writeJsonFile } = require('./utils/file')

async function init(filename) {
  const data = await loadSvgFile(`${filename}.svg`)
  const svg = data.svg.g
  const json = {}

  svg.forEach(item => {
    const id = item['$']['id']
    console.log(id)
    if (id === 'line') {
      json['line'] = parseLine(item)
    }
  })

  writeJsonFile(`${filename}.json`, json)
}

init('ningbo-subway')

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
  return arr
}
