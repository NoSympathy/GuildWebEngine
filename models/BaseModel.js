/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'radityabp',
  database : 'guildengine'
});
 
function GetData(query,callback) {
    //connection.connect();

    connection.query(query, function(err, rows, fields) {
      callback(err,rows);
      
    });

    //connection.end();
}


function FormatString(){
    if (!String.prototype.format) {
      String.prototype.format = function() {
      	
        var args = arguments[0];
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
    }
    
    if(arguments.length > 1){
    	var firstArg = Array.prototype.shift.apply(arguments).toString();
        return firstArg.format(arguments);
    }else if(arguments.length === 1){
    	return arguments[0];
    }else{
        return null;
    }
}


// Functions which will be available to external callers
exports.FormatString = FormatString;
exports.GetData = GetData;
