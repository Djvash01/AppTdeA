const express = require('express');
const router = express.Router();


router.get('/register', (req, res) =>{
    res.render('users/register');
});

router.get('/login', (req, res) =>{
    res.render('users/login');
});

router.post('/register',(req, res)=>{
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
        res.send('ok')
    }
});

module.exports = router;
