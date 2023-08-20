const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', function (req, res) {
  //res.send('Hello World')
  console.log(__dirname+'/index.html')
})

app.get('/w3x/skillarchive/ability',function (req, res) {
	console.log(req.query['id'])
})

app.listen(8080)