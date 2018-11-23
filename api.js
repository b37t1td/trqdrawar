/*********************************************************************************
* File Name     : api.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:34]
* Last Modified : [2018-11-23 22:00]
* Description   :  
**********************************************************************************/
const { Event, Pong } = require('./db');
const moment = require('moment');
const log = require('./logger').log;

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

module.exports.dayTotalBuyPongs = dayTotalBuyPongs;
module.exports.allBots = allBots;
