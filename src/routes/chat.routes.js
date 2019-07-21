const express = require('express');
const router = express.Router();

router.get('/contact',(req,res)=>{
    res.render('chat/chat');
});

module.exports = router;