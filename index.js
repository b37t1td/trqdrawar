/*********************************************************************************
* File Name     : index.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:31]
* Last Modified : [2018-11-23 18:27]
* Description   :  
**********************************************************************************/
require('dotenv').config();
const { dayTotalPongs, allBots } = require('./api');
const { hourlyBar } = require('./pongsChart');

(async () => {

  let bots = await allBots();
  let bot = bots[0];
  let pongs = await dayTotalPongs(bot);
  hourlyBar(pongs);
})();


//const express = require('express')
//const { dayTotalPongs } = require('./api');
//
//const port = process.env.PORT || 3000
//const app = express()
//
//app.get('/total/pong/:id', async (req, res) => {
//  const id = Number(req.params.id);
//  let pongs = await dayTotalPongs(id);
//  process.nextTick(() => res.json(pongs));
//});
//
//app.listen(port, err => {
//    if (err) throw err
//    console.log(`> Ready On Server 0.0.0.0:${port}`)
//})
