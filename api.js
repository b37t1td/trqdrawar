/*********************************************************************************
* File Name     : api.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:34]
* Last Modified : [2018-11-22 21:41]
* Description   :  
**********************************************************************************/
const { Instance, Event, Pong } = require('./db');
const log = require('./logger');

module.exports.PongStats = async function() {
  try {
    throw new Error('aaa');
  } catch(e) {
    log.error(e);
  }
}
