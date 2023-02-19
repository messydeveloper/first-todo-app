const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {checkEmailIfExist} = require('./src/users/queries');


module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            
            //match user
            pool.query(checkEmailIfExist, [email], async (err, results) => {
                if(!results.rows.length){
                    return done(null, false, {message:'Email is not registered'});
                }
            //match password
            if(await bcrypt.compare(password, results.rows[0].password)){
                console.log('db', results.rows);
                return done(null, results.rows[0]);

            }else{
                return done('Invalid password',false);
            }
            })
        })
    );
    passport.serializeUser((user,done) =>{
        console.log('serialize', user);
        done(null, user);
    })
    
    passport.deserializeUser((user, done) => {
        pool.query("SELECT * FROM users WHERE id = $1", [user.id], (err, res) => {
            done(err, res.rows[0]);
        })
    })
}
