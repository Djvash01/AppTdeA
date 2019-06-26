const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/register', (req, res) =>{
    res.render('users/register');
});

router.get('/login', (req, res) =>{
    res.render('users/login');
});

router.post('/register', async (req, res)=>{
    const {dni, name, email, phone, password, confirm_password} = req.body;
    const answer = [];
    if(password != confirm_password){
        answer.push({status: 'danger', description: 'Las contraseñas no coinciden'});
    }
    if(password.length<5){
        answer.push({status: 'danger', description: 'La contraseña debe tener al menos 5 caracteres'});
    }
    if(answer.length>0){
        res.render('users/register',{answer, dni, name, email, phone, password,confirm_password});
    }else{
        try{
            const user = new User({dni, name, email, phone, password});
            user.password = await user.encryptPassword(password);    
            await user.save();
            req.flash('answer',{status: 'success', description: 'Has sido registrado con exito'});
            res.redirect('/api/users/login');
        }catch(err){
            answer.push({status: 'danger', description: err.errmsg});
            res.render('users/register',{answer});
        }
    }
});

router.post('/login',passport.authenticate('local',{
    successRedirect: '/api/courses',
    failureRedirect: '/api/users/login',
    failureFlash: true
}));

router.get('/logout',(req, res)=>{
req.logOut();
res.redirect('/');
});

module.exports = router;
