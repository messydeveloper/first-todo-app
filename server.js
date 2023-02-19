const todoRoutes = require('./src/todo/routes');
const userRoutes = require('./src/users/routes');

const express = require('express');
const app = express();
// const port = 3000;
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('./db');

// Passport Config
require('./passport')(passport);


const cors = require('cors');

var corsOptions = {
    credentials:true,
    origin: "https://translate-todo.ts.r.appspot.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Hello world!");
});


if (process.env.NODE_ENV='production') {
    app.set('trust proxy', 1) // trust first proxy
}

//Express session
app.use(session({
    store:pgSession(session),
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    withCredentials:true,
    cookie:{
        secure:true,
    }
}));




//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
});

