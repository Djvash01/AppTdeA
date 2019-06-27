const helpers = {};

helpers.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','No has iniciado sesion');
    res.redirect('/api/users/login');
};

helpers.isAuthorized = (req, res, next) =>{
    if(req.user.rol !== 'aspirante'){
        return next();
    }
    req.flash('error','No estas autorizado para esta opcion');
    res.redirect('/api/courses/applicant');
};

module.exports = helpers;