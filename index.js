const io = require('socket.io')();
const cpuStats = require('cpu-stats');

const create = (options) => {
  io.listen(options.port);
  io.on('connection', socket => {
    socket.emit('CONNECTION_ACCEPTED', options.ProcName);
  });
  if(options.autoUpdateCpuStats){
    setInterval(()=>{
      cpuStats(1000, function(error, result) {
        if(error) return console.error(error);
        broadcast('CPU_UPDATE',result);
      });
    },options.cpuUpdateInterval||5000);
  }
}

const broadcast = (event,data) => {
  io.emit(event, data);
}

const destroy = () => {
  io.close();
}

module.exports = {create,broadcast,destroy};
