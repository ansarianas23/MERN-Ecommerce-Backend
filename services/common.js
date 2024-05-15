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
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDRhOTFhNjU4MjdjMTA2NWRiOGI3YyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE1Nzg5NjEzfQ.OWZHif2nKQ3gjdmr1d_fXnsDbUIiuqWxH4gqdC2fHp8'
    return token;
}