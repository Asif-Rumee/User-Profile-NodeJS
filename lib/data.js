/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var config = require('./config');
var mysql = require('mysql');
var alert = require('alert');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname,'/../.data/');

//Initiate DB 
var pool = mysql.createPool({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});

//Store data to a table in DB
lib.create = function(table,data,callback){
  // add rows in the table
  function addRow(table,data,callback) {
    var placeHolders = '';
    var values = [];
    for(key in data ){
      placeHolders += '?,';
      values.push(data[key]);
    }
    placeHolders = placeHolders.slice(0,placeHolders.length-1);
    var insertQuery = `INSERT INTO ?? VALUES (${placeHolders})`;
    var query = mysql.format(insertQuery,[table,...values]);
    pool.query(query,(err, res) => {
        if(err) {
            console.error(err);
            callback(err);
            return;
        }
        // rows added
        console.log(res);
        callback(false);
    });
  }
  
  // timeout just to avoid firing query before connection happens
  setTimeout(() => {
    // call the function
    addRow(table,data,callback);
  },50);
};

// Read data from a table in DB
lib.read = function(table,key,callback){
  // query rows in the table
  function queryRow(table,key,callback) {
    var selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    var query = mysql.format(selectQuery,[table,Object.keys(key)[0], Object.values(key)[0]]);
    pool.query(query,(err, data) => {
        if(err) {
          callback(true);
        }else if(!data.length) {
          callback(true);
        }
        else{
          callback(false,data[0]);
        }
    });
  }

  // timeout just to avoid firing query before connection happens
  setTimeout(() => {
    // call the function
    // select rows
    queryRow(table,key,callback);
  },50);
};
// Update data in a table in DB
lib.update = function(table,key,data,callback){
  // update a row
  function updateRow(table,key,data,callback) {
    var placeHolders = '';
    var values = [];
    for(k in data ){
      placeHolders += '?? = ?,';
      values.push(k,data[k]);
    }
    placeHolders = placeHolders.slice(0,placeHolders.length-1);
    var updateQuery = `UPDATE ?? SET ${placeHolders} where ?? = ?`;
    var query = mysql.format(updateQuery,[table,...values,Object.keys(key)[0],Object.values(key)[0]]);
    console.log(query);
    pool.query(query,(err, res) => {
        if(err) {
          console.error(err);
          alert('Sorry, could not update the profile\'s data!!!');
          callback(err);
        }else{
          // rows updated
          alert('Updated the profile\'s data successfully!!!');
          console.log(res.affectedRows);
        }
    });
  }

  // timeout just to avoid firing query before connection happens
  setTimeout(() => {
    // call the function
    // update row
    updateRow(table,key,data,callback);
  },50);
};

// Delete data from a table in DB
lib.delete = function(table,key,callback){
  function deleteRow(table,key,callback) {
    let deleteQuery = "DELETE from ?? where ?? = ?";
    let query = mysql.format(deleteQuery, [table, Object.keys(key)[0], Object.values(key)[0]]);
    pool.query(query,(err, res) => {
        if(err) {
          alert('Sorry, could not delete the profile!!!');
          console.error(err);
          callback(err);
        }else{
          // rows deleted
          alert('Deleted the profile successfully!!!');
          console.log(res.affectedRows);
        }
    });
  }

  // timeout just to avoid firing query before connection happens
  setTimeout(() => {
      // call the function
      // delete row
      deleteRow(table,key,callback);
  },50);
};

// List all the items in a directory
lib.list = function(dir,callback){
  fs.readdir(lib.baseDir+dir+'/', function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};

// Export the module
module.exports = lib;
