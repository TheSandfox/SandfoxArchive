const express = require('express');
const router = express.Router();
const path = require('path');

function getJson(root,fileName) {
	//로컬
	return path.join(__dirname,root,fileName);
}

const dirs = [
	'w3x/SkillArchive/'
]

dirs.forEach((dir)=>{
	
	router.route(`/${dir}:fileName`).get((req,res)=>{
		console.log(path.join(__dirname,`/../src/json/${dir}`,req.params.fileName));
		res.sendFile(getJson(`/../src/json/${dir}`,req.params.fileName));
	})

})


module.exports = router;