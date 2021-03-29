const fs= require("fs");
const users=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getUsers = (req,res)=>{
    res
    .status(200)
    .json({
        status:"success",
        requestedAt:req.requestTime,
        data:{
            users
        }
    });
};

exports.getUser = (req,res)=>{
    const id=req.params.id;
    console.log(id);
    const user = users.find((el)=>el.id==id);
    res
    .status(200)
    .json({
        status:"success",
        data:{
            user
        }
    });
};

exports.addUser = (req,res)=>{
    console.log(req.body);

    const newID=users[users.length-1].id + 1;
    const newUser= Object.assign( {id:newID} , req.body);

    tours.push(newUser);

    fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(users,null,4),err=>{
        res.status(201).json({
            status:"success",
            data:{
                user:newUser
            }   
        });
    });
    // we must convert JS object to JSON using JSON.stringify()

};

exports.changeUser = (req,res)=>{
    if(req.params.id*1>users.length){
        return res.status(404).json({
            status:"failed",
            message:"Invalid ID"
        });
    }
    else{

    res.status(200).json({
        status:"success",
        data:{
            user : "<User updated...>"
        }
    });
    }
};

exports.deleteUser = (req,res)=>{
    if(req.params.id*1>users.length){
        return res.status(404).json({
            status:"failed",
            message:"Invalid ID"
        });
    }
    else{

    res.status(204).json({
        status:"success",
        data:null
    });
    }
};