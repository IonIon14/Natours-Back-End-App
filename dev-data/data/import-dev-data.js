const fs=require("fs");

const Tour=require('./../../models/tourModel');

const mongoose =require('mongoose');

const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection successful!");
});

//READ JSON FILE

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

// IMPORT DATA INTO DATABASE

const importData= async ()=>{
    try{
        await Tour.create(tours); //array of JS objects
        console.log("Data successfully loaded!");
        process.exit();
    }
    catch(err){
        console.log(err);
    }
};

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () =>{
 
    try{
        await Tour.deleteMany(); //delete all data 
        console.log("Data successfully deleted!");
        process.exit();
    }
    catch(err){
        console.log(err);
    }
};

if(process.argv[2] ==="--import"){
    importData();
}
if(process.argv[2]==="--delete"){
    deleteData();
}

console.log(process.argv);
