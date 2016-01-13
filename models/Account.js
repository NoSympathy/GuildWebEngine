/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var base = require("./BaseModel");
var tableName = "Account";
var column = ["name","apikey"];

exports.ExportData = function(name,apikey,callback){
    GetByName(name,function(err,data){
        if(err){
            callback(err,data);
            
        }else{
            
            if(data.length > 0){
                UpdateData(name,apikey,callback);
            }else{
                InsertData(name,apikey,callback);
            }
        }
    });
    
    
    
};

exports.GetAll = function GetAll(callback){
    var query = base.FormatString("select * from {0}",tableName);
    base.GetData(query,callback);
}

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