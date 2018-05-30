const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

exports.loadSvgFile = function loadSvgFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile('file/' + filename, function(err, data) {
      if (err) {
        reject(err)
      }
      parser.parseString(data, function(err, result) {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  })
}

exports.writeJsonFile = function writeJsonFile(filename, data) {
  fs.writeFileSync('export/' + filename, JSON.stringify(data))
}