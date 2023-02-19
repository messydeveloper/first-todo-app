const todoRoutes = require('./src/todo/routes');
const userRoutes = require('./src/users/routes');

const express = require('express');
const app = express();
// const port = 3000;
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser')

// Passport Config
require('./passport')(passport);


const cors = require('cors');

var corsOptions = {
    credentials:true,
    origin: "https://translate-todo.ts.r.appspot.com",
    methods: "GET, PUT, POST, DELETE"
}

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Hello world!");
});

//Express session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    withCredentials:true,
    cookie:{secure:false}
    // session:true
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/users', userRoutes);


app.listen(process.env.PORT);
