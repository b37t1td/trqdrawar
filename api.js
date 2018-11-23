/*********************************************************************************
* File Name     : api.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:34]
* Last Modified : [2018-11-23 18:24]
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
          fail: { '$addToSet': '$fail' }
        }
      }, {
        $project: {
          _id: '$_id',
          buy: { $sum: '$buy' },
          fail: { $sum: '$fail' }
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

async function dayTotalPongs(id) {
  let lastRecord = await Pong.findOne().sort({ created: -1 });
  let start = moment(lastRecord.created).subtract(24, 'hours').utc();
  let stop = moment(lastRecord.created).subtract(23, 'hour').utc();
  let out = [];

  for (let i = 0; i < 24; i++) {

    let pongs = await PongStats(id, start.toDate(), stop.toDate());

    out.push({
      label: st(start.hour()),
      buy: pongs ? pongs.buy : 0,
      fail: pongs ? pongs.fail : 0
    });

    start.add(1, 'hour');
    stop.add(1, 'hour');
  }

  return out;
}

module.exports.dayTotalPongs = dayTotalPongs;
module.exports.allBots = allBots;
