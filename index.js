/*********************************************************************************
* File Name     : index.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:31]
* Last Modified : [2018-11-23 21:57]
* Description   :  
**********************************************************************************/
require('dotenv').config();
const { dayTotalBuyPongs, allBots } = require('./api');
const { hourlyBar } = require('./pongsChart');

const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('/day/buy/:id', async (req, res) => {
  const id = Number(req.params.id);
  let pongs = await dayTotalBuyPongs(id);
  let bar = hourlyBar({ data: pongs });

  res.setHeader('Content-Type', 'image/svg+xml');
  process.nextTick(() => res.send(bar));
});

app.get('/day/total/:id', async (req, res) => {
  const id = Number(req.params.id);
  let pongs = await dayTotalPongs(id);
  let bar = hourlyBar({ data: pongs });

  res.setHeader('Content-Type', 'image/svg+xml');
  process.nextTick(() => res.send(bar));
});

app.get('/', async(req, res) => {

});

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server 0.0.0.0:${port}`)
});
