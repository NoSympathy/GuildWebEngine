var account_model = require("../models/Account");
var pvp_model = require("../models/Pvp");


function ExportApiKey(req,res) {
    
    var name = req.body.name;
    var apikey = req.body.apikey;
    //console.log()
    //var insert = sprint "INSERT into account()"
    account_model.ExportData(name,apikey,function(err,data){
        var ret = {};
        if(err){
            
            ret.status = 505;
            ret.message = "Export Data error";
            ret.error = err;
            res.send(JSON.stringify(ret));
        }else{
            ret.status = 1;
            ret.data = data;
            res.send(JSON.stringify(ret));
        }
    });
    
}


function GetGuildPvpStats(req,res){
    pvp_model.GetMemberPvpData(function(err,data){
        
        var ret = {};
        if(err){
            ret.status = 505;
            ret.message = "Export Data error";
            ret.error = err;
            res.send(JSON.stringify(ret));
        }else{
            ret.status = 1;
            ret.data = data;
            res.send(JSON.stringify(ret));
        }
    });
}

// Functions which will be available to external callers
exports.GetPvpStats = GetGuildPvpStats;
exports.Export = ExportApiKey;
