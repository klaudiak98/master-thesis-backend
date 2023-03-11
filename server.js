const logEvents = require('./logEvents');

const EventEmitter = require('events');

class Emitter extends EventEmitter {};

const emitter = new Emitter();

emitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     emitter.emit('log','Log event emitted!')
// }, 2000);