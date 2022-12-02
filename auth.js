const bcrypt = require('bcryptjs');
const { use } = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [{

id:1,
username: 'Jackson',
password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
email:'jacksonmanoel1999@gmail.com'

}]

module.exports = function (passport) {


    function findUser(username){
        return users.find(item => item.username === username);
    }
    function findUserById(id){
        return users.find(item => item.id === id);
    }
    

    passport.serializeUser((user, done) => {
        done(null,user.id);
    })

    passport.deserializeUser((id, done) =>{
    try {
        const user= findUserById(id);
        done(null, user);
    } catch (err) {
        console.log(err);
        return done(err, null);
        
    }})

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, passport, done) =>{
        try {
            const user = findUser(username);
            if (!user){
                return done(null,false);
                
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return done(null,false); 
            }
            return done(null,user);
            
        } catch (err) {
            console.log(err);
            return done(err,false);
        }

    }));
}
