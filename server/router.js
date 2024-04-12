const express = require('express');
const router = express.Router();

router.route('/api/test').get((req,res)=>{
	res.json('Hello World');
})

module.exports = router;