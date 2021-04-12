const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController')

router.get('/', auth, (req,res)=>{
    
    if(req.user.admin){
    res.send('da boss')
    } else{
        res.status(401).send('Not admin: access denied')
    }
})

router.get('/account', auth, (req,res)=>{
    res.render('profile')
})

module.exports = router;