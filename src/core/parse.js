exports.parseLine = function parseLine(data, style) {
  const list = data.polyline
  const arr = []
  list.forEach(item => {
    item = item['$']
    let { id: name, points } = item
    name = name.replace('line-', '') + '号线'

    const css = style['.' + item.class]
    arr.push({
      name,
      points,
      color: css.stroke
    })
  })
  return arr
}

exports.parseStation = function parseStation(data) {
  const list = data.circle
  const arr = []
  list.forEach(item => {
    item = item['$']
    const { id: name = '未命名站', cx: x, cy: y } = item
    arr.push({
      name,
      x,
      y,
      type: 1
    })
  })
  return arr
}

exports.parseStationEx = function parseStationEx(data) {
  const list = data.rect
  const arr = []
  list.forEach(item => {
    item = item['$']
    const { id: name = '未命名站', x, y, width, height } = item
    arr.push({
      name,
      x,
      y,
      width,
      height,
      type: 2
    })
  })
  return arr
}

exports.parseText = function parseText(data) {
  const list = data.text
  const arr = []
  list.forEach(item => {
    const title = item._
    const transform = item['$']['transform']

    const xy = /\((.*)\)/.exec(transform)[1].split(' ')
    const x = parseFloat(xy[0])
    const y = parseFloat(xy[1])
    arr.push({
      title,
      x,
      y
    })
  })
  return arr
}
