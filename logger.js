/*********************************************************************************
* File Name     : logger.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:39]
* Last Modified : [2018-11-22 21:42]
* Description   :  
**********************************************************************************/

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
