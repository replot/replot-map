var express = require('express')
var request = require('request')
var fs = require('fs')

var app = express()

// all pages
app.get('/app*', function (req, res) {
  res.set('Content-Type', 'text/html')
  res.send(fs.readFileSync(__dirname + '/example.html'))
})

// bundle
app.get('/bundle.js', function (req, res) {
  res.set('Content-Type', 'application/javascript')
  res.send(fs.readFileSync(__dirname + '/bundle.js'))
})

app.listen(5000, function () {
  console.log('Replot-map listening on port 5000!')
})
