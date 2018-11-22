/*********************************************************************************
* File Name     : db.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-22 21:31]
* Last Modified : [2018-11-22 21:32]
* Description   :  
**********************************************************************************/

const mongoose = require('mongoose');
let dbInstance;

const Pong = mongoose.model('Pong', new mongoose.Schema({
  bot: Number,
  pet: Number,
  fail: Number,
  rice: Number,
  price: Number,
  buy: Number,
  n: Number,
  created: Date
}));

const Share = mongoose.model('Share', new mongoose.Schema({
  id: Number,
  donor: Number,
  created: Date
}));

const Event = mongoose.model('Event', new mongoose.Schema({
  id: Number,
  owner_id: Number,
  pet_id: Number,
  purchase_price: String,
  earned_amount: String,
  profit_amount: String,
  event_date: Number,
  event_type: Number,
  current_owner_id: Number
}));

async function instance() {
  try {
    if (!dbInstance) {
      await mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
      dbInstance = mongoose.connection;
    }
  } catch(e) {
    console.log(e);
    return await instance();
  }

  return dbInstance;
}

module.exports.Pong = Pong;
module.exports.Share = Share;
module.exports.Event = Event;
module.exports.instance = instance;
