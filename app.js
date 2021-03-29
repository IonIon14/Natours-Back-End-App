// core modules, our modules, any required at first

const express = require("express");
const morgan=require("morgan");
const app = express();

//then we specify middlewares


// 1)Middlewares 
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(express.json());//middleware

app.use(express.static(`${__dirname}/public`));

app.use((req,res,next)=>{
    console.log("Hello from the middleware!");
    next();
});

//DECLARE ROUTERS

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//MOUNTING ROUTES
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;
