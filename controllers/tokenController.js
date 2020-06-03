var Token = require('../models/token');

exports.deviceTokens = function(req,res){
    if(req.body.token){
        Token.find({token:req.body.token},function(err,data){
            if(err){
                console.log(err);
            }else{
                if(data.length>0){
                    console.log("Token Already Exists......");
                    res.status(200).send("Token Already Exists")
                }else{
                    Token.insertMany({token:req.body.token},function(err,data){
                        if(err){
                            console.log(err);
                        }else{
                            res.status(200).send("Token Registered")
                        }
                    })

                }
            }
        })
        
    }

}

exports.getTokens = function(req,res){
    Token.find({},function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
        return data;
    })
}