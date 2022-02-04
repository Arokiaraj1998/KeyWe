const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


module.exports = function (){

    let server = express(),
        create,
        start;

       create = (config) =>{
           let router = require('../router')
           
        server.set('env',config.env);
        server.set('port',config.port);
        server.set('hostname',config.hostname)

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({extended:false}));

        console.log(config)

        // Mongoose Connections
        mongoose.connect(config.dbSettings.uri,{ useNewUrlParser: true, useUnifiedTopology: true,dbName:config.dbSettings.databaseName})
        .then(con => {
            if(con)
            {
              console.log('Mongo db Connected!!!');
              mongoose.set('debug', true);
            }
            else
            {
              console.log('FAILED TO CONNECT MONGO DB!!');
            }            
          })
          .catch(error => {
            if(error)
            {
              console.log('FAILED TO CONNECT MONGO DB!');
              console.log(error);
            }
          });  

          //set up routes
          router.init(server)
          
       }
       start = () =>{
           let hostname = server.get('hostname'),
           port = server.get('port');
           server.listen(port,function(){
               console.log(`http://${hostname}:${port}`);
           });
       }
       return {
           create: create,
           start: start
       };
    };