/*********************************************************************************
* File Name     : api.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:34]
* Last Modified : [2018-11-24 01:30]
* Description   :  
**********************************************************************************/
const { Event, Pong } = require('./db');
const moment = require('moment');
const log = require('./logger').log;
//const BigNumber = require('bignumber.js');
const SBig = require('./tools/shorthand');

async function allBots() {
  return await Pong.distinct('bot');
}

async function PongStats(id, start = 0, stop = 0) {
  try {
    let counters = await Pong.aggregate([
      {
        $match: {
          bot: id,
          created: { $gte: start, $lte: stop }
        }
      },
      {
        $group: {
          _id: '$bot',
          buy: { '$addToSet': '$buy' },
        }
      }, {
        $project: {
          _id: '$_id',
          value: { $sum: '$buy' },
        }
      }
    ]);

    return counters[0];
  } catch(e) {
    log({ level: 'error', message: e });
  }
}

function st(a) {
  return (a < 10 ? '0'+a: a) + ':00';
}

async function dayTotalBuyPongs(id) {
  let lastRecord = await Pong.findOne().sort({ created: -1 });
  let start = moment(lastRecord.created).subtract(24, 'hours').utc();
  let stop = moment(lastRecord.created).subtract(23, 'hour').utc();
  let out = [];

  for (let i = 0; i < 24; i++) {

    let pongs = await PongStats(id, start.toDate(), stop.toDate());

    out.push({
      label: st(start.hour()),
      value: pongs ? pongs.value : 0
    });

    start.add(1, 'hour');
    stop.add(1, 'hour');
  }

  return out;
}

async function dayTotalPongs(id) {
  let lastRecord = await Pong.findOne().sort({ created: -1 });
  let start = moment(lastRecord.created).subtract(23, 'hours').startOf('hour').utc();
  let stop = moment(lastRecord.created).subtract(22, 'hour').startOf('hour').utc();
  let out = [];

  for (let i = 0; i < 24; i++) {

    let pongs = await Pong.count({ bot: id, created: { $gte: start, $lte: stop }});

    out.push({
      label: st(start.hour()),
      value: pongs || 0
    });

    start.add(1, 'hour');
    stop.add(1, 'hour');
  }

  return out;
}

async function weekMoney(id) {
  let lastRecord = await Event.findOne().sort({ created: -1 });
  let start = moment(lastRecord.created).subtract(6, 'days').startOf('day').minutes(0).utc();
  let stop = moment(lastRecord.created).subtract(5, 'days').startOf('day').utc();
  let out = [];

  for (let i = 0; i < 7; i++) {
    let data = await Event.find({ id, event_type: 3, profit_amount: { $ne: null },
      event_date: { $gte: start.unix(), $lte: stop.unix() }}, ['profit_amount']);

    let v = {
      day: i === 6 ? 'today' : moment(stop).fromNow(),
      value: data.reduce(function(a,b) {
        return a.plus(SBig(b.profit_amount));
      }, SBig(0))
    };

    if (v.value.isGreaterThan(SBig('1'))) {
      v.value = v.value.toShort(v.value);
    } else {
      v.value = '-';
    }

    out.push(v);

    start.add(1, 'day');
    stop.add(1, 'day');
  }

  return out.reverse();
}

module.exports.dayTotalBuyPongs = dayTotalBuyPongs;
module.exports.dayTotalPongs = dayTotalPongs;
module.exports.weekMoney = weekMoney;
module.exports.allBots = allBots;
