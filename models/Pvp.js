var base = require("./BaseModel");
var account = require("./Account");
var request = require("request");
var async = require("async");

var endpoints = require("./EndPoints");

var tableName = "PVP";
var column = ["name", "rank", "tier", "win", "lose", "ratio", "profession", "has_hot", "build_link"];


function GetByName(name,callback){
    var query = base.FormatString("select * from {0} where {1} = '{2}'",tableName,column[0],name);
    base.GetData(query,callback);
}


function InsertData(name,apikey,callback){
    var query = base.FormatString("insert into {0}({1}) values('{2}','{3}')",tableName,column.toString(),name,apikey);
    //console.log(query);
    base.GetData(query,callback);
}

function UpdateData(name,apikey,callback){
    var query = base.FormatString("Update {0} set apikey = '{3}' where {1} = '{2}'",tableName,column[0],name,apikey);
    console.log(query);
    
    base.GetData(query,callback);
}

exports.GetMemberPvpData =  function PopulatePvpDataFromApi(maincallback){
    var accounts = [];
    account.GetAll(function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            async.forEachOf(rows,function(account,key,callback){
                GetPersonalPvpData(account,function(err,response,body){
                    
                    if(err) return callback(err);
                    try {
                        account.pvp = JSON.parse(body);
                        accounts[key] = account;
                    } catch (e) {
                        return callback(e);
                    }
                    callback();
                });
            },function(err){
                if(err) {
                    //console.log("0",err);
                    return maincallback(err);
                }else{
                    //console.log("1",accounts);
                    maincallback(err,accounts);
                }
            });

        }
    });
}


function GetPersonalPvpData(account, callback){
    request({
        url: endpoints.BaseUrl + endpoints.PvpStats, //URL to hit
        qs: {access_token: account.apikey}, //Query string data
        method: 'GET'
        
    }, function(error, response, body){
        if(error) {
            console.log(error);
            callback(error, response, body);
        } else {
            account.pvp = JSON.parse(body);
            console.log(response.statusCode, account);
            callback(error, response, body);
        }
    });
}