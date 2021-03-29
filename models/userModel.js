const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'An user must have a name'],
        trim:true
    },
    email:{
        type:String,
        required:[true,"An user must have an email"],
        trim:true
    },
    role:{
        type:String
    },
    active:{
        type:Boolean,
        trim:true
    }
    ,
    photo:{
        type:String,
        unique:true,

    },

    password:[String],

});

const Tour= mongoose.model('Tour',tourSchema);

module.exports = Tour;