require('dotenv').config({path:'.env'});
const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');

const mongoose = require('mongoose');

const url = require('./config/mongoose')

const user = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8000;


console.log('Hello world');

app.use(flash());

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    // console.log(req.body);

    next();
});

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.use(user);





const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

// console.log(url);
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('connected to database successfully');
        app.listen(PORT, (error) =>{
            if(!error)
                console.log("Server is Successfully Running, and App is listening on port "+ PORT)
            else 
                console.log("Error occurred, server can't start", error);
            }
        );
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })