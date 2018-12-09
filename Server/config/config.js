//config.js module

var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'UCCSS'    },    
                   port: 5000,  
                   db: 'mongodb://127.0.0.1/helpMe-dev',
                   secret: "StarWars1977StarTrekJamesBond",
                   uploads: './public/uploadedFiles' 
        },  
        production: {    
                     root: rootPath,    
                     app: {      name: 'UCCSS'    },    
                     port: 80, 
                     db: 'mongodb://127.0.0.1/helpMe' },
                     secret: "StarWars1977StarTrekJamesBond",
                     uploads: './public/uploadedFiles' 
         };

module.exports = config[env];
