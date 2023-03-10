const {Router} = require('express');
const controller = require('./controller');
const passport = require('passport');
const pool = require('../../db');
const query = require('./queries');
const logQuery = require('../../log_queries');

const router = Router();

const auth = () => {
    return (req,res,next) => {
        passport.authenticate('local', (error,user,info) => {
            if(error) res.status(400).json({"statusCode": 200, "message":"error"});
            req.login(user, (error) => {
                if(error) return next(error);
                console.log('auth',user, res);
                next();
            })
        })(req,res,next);
    }
}


router.get('/', controller.getAllUsersWithLogs);
router.post('/signup', controller.signup);

router.post('/login', auth(), (req, res)=>{
    let date = new Date();
    let userInfo = req.session.passport.user;
    res.status(200).json({
        "id":req.user.id, 
        "user": req.body.email, 
        "message" : "successfully logged in", 
        "sessionID":req.sessionID,
        "role":req.user.role
    });
    pool.query(logQuery.sendLoginDate, [userInfo.id, req.body.email, date.toLocaleString(), userInfo.role]);
});

router.post('/logout', (req, res) => {
    req.logOut((err) => {
        console.log(err)
    });
    console.log('logout',req.sessionID);
    pool.query(query.deleteSession, [req.sessionID], (err,res)=>{
        if(err) throw err;
    })
    req.session.destroy();
    res.send({message:"successfully logged out"});
  });

module.exports = router;