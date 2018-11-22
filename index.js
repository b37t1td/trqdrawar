/*********************************************************************************
* File Name     : index.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:31]
* Last Modified : [2018-11-22 21:36]
* Description   :  
**********************************************************************************/
require('dotenv').config();
const { PongStats } = require('./api');

(async () => {
  await PongStats();
})();