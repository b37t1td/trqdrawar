/*********************************************************************************
* File Name     : index.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:31]
* Last Modified : [2018-11-24 15:32]
* Description   :  
**********************************************************************************/
require('dotenv').config();
const { dayTotalBuyPongs, todayMoney, dayTotalPongs, weekMoney, allBots } = require('./api');
const { hourlyBar } = require('./pongsChart');

const express = require('express');
const hbs = require('express-handlebars');

const port = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/day/buy/:id', async (req, res) => {
  const id = Number(req.params.id);
  let pongs = await dayTotalBuyPongs(id);
  let bar = hourlyBar({ data: pongs, color: 'green' });

  res.setHeader('Content-Type', 'image/svg+xml');
  process.nextTick(() => res.send(bar));
});

app.get(['/day/total/:id/*', '/day/total/:id' ], async (req, res) => {
  const id = Number(req.params.id);
  let pongs = await dayTotalPongs(id);
  let bar = hourlyBar({ data: pongs, color: 'grey' });

  res.setHeader('Content-Type', 'image/svg+xml');
  process.nextTick(() => res.send(bar));
});

app.get('/week/:id', async(req, res) => {
  const id = Number(req.params.id);
  let data = await weekMoney(id);
  process.nextTick(() => res.json(data));
});

app.get('/', async(req, res) => {
  const bots = await allBots();
  const data = [];
  for (let b of bots) {
    data.push({
      id: b,
      ww: await weekMoney(b)
    });
  }
  res.render('home', { data } );
});

app.get('/day/money/:id', async(req, res) => {
  const id = Number(req.params.id);
  let m = await todayMoney(id)
  process.nextTick(() => res.json(m));
});

app.get('/tv', async(req, res) => {
  const bots = await allBots();
  const data = [];
  for (let b of bots) {
    data.push({
      id: b,
      ww: await todayMoney(b)
    });
  }
  res.render('tv', { data, layout: false } );
});

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server 0.0.0.0:${port}`)
});
