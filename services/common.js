const passport = require("passport");

exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
};

exports.sanitizeUser = (user)=>{
    return  {id: user.id, role: user.role}
}

exports.cookieExtractor = function(req){
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDRhOWFjYjdiYWE1MDFjMjMwZWU5NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE1Nzg3MzAzfQ.Vje4vbzu-woIy_wODk1gpO_tY9trD6O5h1OHNxQ60pI'
    return token;
}