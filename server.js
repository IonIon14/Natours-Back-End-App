const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app= require('./app');
const port=3000 || dotenv.env.PORT;



const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection successful!");
});

//this is where we connect our app to database


console.log(process.env);

app.listen(port, ()=>{
    console.log("Listen on port 3000....")
});

