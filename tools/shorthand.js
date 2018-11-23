/*********************************************************************************
* File Name     : tools/shorthand.js
* Created By    : Svetlana Linuxenko, <svetlana@linuxenko.pro>, www.linuxenko.pro
* Creation Date : [2018-11-23 22:47]
* Last Modified : [2018-11-24 00:41]
* Description   :  
**********************************************************************************/

const Big = require('bignumber.js');

const shorthand = [
  {
    symbol: 'Nv',
    threshold: 96,
    color: '#39b54a',
    cssClass: 'shorthand-nv',
    value: '1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Sv',
    threshold: 90,
    color: '#f05370',
    cssClass: 'shorthand-sv',
    value: '1000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Qv',
    threshold: 84,
    color: '#b86503',
    cssClass: 'shorthand-qv',
    value: '1000000000000000000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Tv',
    threshold: 78,
    color: '#04a1a3',
    cssClass: 'shorthand-tv',
    value: '10000000000000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Uv',
    threshold: 72,
    color: '#ff6c00',
    cssClass: 'shorthand-uv',
    value: '10000000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Nd',
    threshold: 66,
    color: '#9b59b6',
    cssClass: 'shorthand-nd',
    value: '100000000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Sd',
    threshold: 60,
    color: '#e1a606',
    cssClass: 'shorthand-sd',
    value: '1000000000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Qd',
    threshold: 54,
    color: '#39b54a',
    cssClass: 'shorthand-qd',
    value: '1000000000000000000000000000000000000000000000000'
  },
  {
    symbol: 'Td',
    threshold: 48,
    color: '#f05370',
    cssClass: 'shorthand-td',
    value: '1000000000000000000000000000000000000000000'
  },
  {
    symbol: 'U',
    threshold: 42,
    color: '#b86503',
    cssClass: 'shorthand-u',
    value: '1000000000000000000000000000000000000'
  },
  {
    symbol: 'N',
    threshold: 36,
    color: '#04a1a3',
    cssClass: 'shorthand-n',
    value: '1000000000000000000000000000000'
  },
  {
    symbol: 'S',
    threshold: 30,
    color: '#ff6c00',
    cssClass: 'shorthand-s',
    value: '1000000000000000000000000'
  },
  {
    symbol: 'Q',
    threshold: 24,
    color: '#9b59b6',
    cssClass: 'shorthand-q',
    value: '1000000000000000000'
  },
  {
    symbol: 'T',
    threshold: 18,
    color: '#e1a606',
    cssClass: 'shorthand-t',
    value: '1000000000000'
  },
  {
    symbol: 'M',
    threshold: 12,
    color: '#39b54a',
    cssClass: 'shorthand-m',
    value: '1000000'
  },
  {
    symbol: '',
    threshold: 0,
    color: '#000000',
    value: '1'
  }
];

const format = {
  currency: function (b, a) {
    if (a) return '$' + format.commify(b);
    b = parseInt(b, 10);
    return 'number' === typeof b && isFinite(b) ? 0 <= b ? '$' + format.commify(b)  : '-$' + format.commify(b).slice(1)  : ''
  },
  commify: function (b) {
    b = (b || 0).toString();
    for (var a = /(\d+)(\d{3})/; a.test(b); ) b = b.replace(a, '$1,$2');
    return b
  },
  decommify: function (b) {
    b = '0' + b.replace(/,/g, '');
    return parseInt(b, 10)
  }
};

(function () {
  var b = shorthand.slice().reverse();

  (function() {
    for (let i of b) {
      i.instance = Big(i.value);
    }
  })();

  function findSlot(val) {
//    for (let i = 0; i < b.length; i++) {
//      let bi = b[i];
//      if (bi.instance.isLessThan(val) && b[i+1] && b[i+1].instance.isGreaterThan(val)) {
//        return bi;
//      }
//    }
    return b[10];
  }

  var c = function (a, b, c, g) {
    var d = a.length;
    return (d > b - 6 ? format.currency(a.substring(0, d - b + 6), !0)  : d > b - 7 ? '$0.' + a.substring(0, 2)  : d > b - 8 ? '$0.0' + a.substring(0, 1)  : sprintf(g, '$0.01')) + g + c
  };

  let toIntegerString = Big.prototype.toIntegerString = function (val) {
    let a = val ? val.toFixed(0) : this.toFixed(0);
    let b = a.indexOf('.');
    0 <= b && (a = a.substr(0, b));
    return a
  };

  let toShort = Big.prototype.toShort = function() {
    let slot = findSlot(this);
    var b = toIntegerString(this),
    e = slot.symbol;
    return e ? c(b, slot.threshold, slot.symbol, ' ')  : b;
  }
}) ();

module.exports = Big;

