# trans-parent
Easily expose stats from long-running node processes via websockets.
## Installation
```sh
npm install --save trans-parent
```
## Usage
```javascript
const trans = require('trans-parent');

trans.create({
  port : 8888, // Pick a port number and listen for connections
  procName : 'Test', // Name the process that's exposing its stats
  autoUpdateCpuStats : true, // Do you want automatic cpu stat updates?
  cpuUpdateInterval : 3000 // How frequently? Default is 10s (10000)
});

trans.broadcast('SOME_MESSAGE',{ some : 'data' });

trans.destroy() // When you're finished pushing stats
```
Useful for long-running processes like web crawlers. Simply creating an instance with autoUpdateCpuStats : true and you get periodic cpu info broadcast to all listeners with a message type of 'CPU_UPDATE'. Initial connections receive a message type of 'CONNECTION_ACCEPTED' and the process name you specified on creation.

Any time during the life of your process, update stats with your own message type and value. Values can be any type, including strings, numbers, arrays and objects:
```javascript
trans.broadcast('RECORDS_PROCESSED',{
    numRecordsProcessed : 3097,
    numRecordsRemaining : 28752
})
```
Create your own web or mobile dashboard and connect to the process using a library like [socket.io-client](https://www.npmjs.com/package/socket.io-client)