const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./router');
const path = require('path');

const port = 4000;

app.use(express.json()); //json관련 기능 사용
app.use(express.urlencoded({extended:false})); //url인코딩 관련 기능 사용
app.use('/',route); //라우트 관련 기능 사용
app.use(express.static(path.join(__dirname,'public'))); //static관련 기능 사용
app.use(cors());

app.listen(port,()=>{
	console.log('SandfoxArchive rest server 가동!');
});