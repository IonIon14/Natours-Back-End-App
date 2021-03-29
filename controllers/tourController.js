const Tour =require('../models/tourModel');

const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours =  (req,res,next) =>{

    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();

};

exports.getTours = async (req,res)=>{
    
    try{
        const features = new APIFeatures (Tour.find(),req.query)
        .filter()
        .sort()
        .limit()
        .pagination();

        const tours = await features.query;
            
        // SEND RESPONSE
        res
        .status(200)
        .json({
            status:"success",
            result:tours.length,
            data:{
                tours
            }
        });
    }
    catch(e){
        res
        .status(404)
        .json({
            status:"fail",
            message:e
        });

    }
};

exports.getTour = async  (req,res)=>{
    try{
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({ _id:req.params.id })

        res
        .status(200)
        .json({
            status:"success",
            data:{
                tour
            }
        });
    }
    catch(e){
        res
        .status(404)
        .json({
            status:"fail",
            message:e
        });

    }
    
};

exports.addTour = async (req,res)=>{
    try
    {
        const newTour = await Tour.create(req.body); //return query

        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }   
        });
    }
    catch(e)
    {
        res.status(400).json({
            status:"fail",
            message:e
        });
    }

};


exports.changeTour = async (req,res)=>{
    try{

        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body ,{
            new: true,
            runValidators:true,

        });  //return Query

        res.status(200).json({
            status:"success",
            data:{
                tour:updatedTour
            }
        });

     } 
    catch(e){
        
        res.status(400).json({
            status:"fail",
            message:e
        });
    }
};

exports.deleteTour = async (req,res)=>{
    try{
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status:"success",
            message:"Item deleted successfully",
            data:null
        }); 
    }
    catch(err){
        res
        .status(400)
        .json({
            status:"fail",
            message:err
        });
    }

};

exports.getTourStats = async (req,res) =>{
    console.log(req.url);
    try{
        const stats= await Tour.aggregate([
            {
                $match: {ratingsAverage:{$gte:4.5}}
            },
            {
                $group: {
                    _id:{$toUpper: "$difficulty"},
                    numTours:{$sum:1},
                    avgRating:{ $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: {$min : '$price'},
                    maxPrice: {$max: '$price'},
                }
            },
            {   
                $sort:{
                    avgPrice:1,
                    minPrice:1,
                    avgRating:-1
                }
            }
        ]);
        
        res.status(200).json({
            status:"success",
            data:{
                stats
            }   
        });
        //operation on query Model
    }
    catch(err){
        res
        .status(400)
        .json({
            status:"fail",
            message:err
        });
    }
};

exports.getMonthlyPlan = async (req,res) =>{
    try{
        const year =req.params.year*1;
        console.log(year); 
        const plan =Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month:"$startDates"},
                    numTourStarts:{$sum:1},
                    tours:{ $push: "$name" }
                }
            },
            {
                $addFields:{month:"$_id"}
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{
                    numTourStarts:-1
                }
            }
        ]);

        res.status(200).json({
            status:"success",
            data:{
                plan
            }   
        });
    }
    catch(err){
        res
        .status(400)
        .json({
            status:"fail",
            message:err
        });
    }
};

