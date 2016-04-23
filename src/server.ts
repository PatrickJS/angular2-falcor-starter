if (process.env.NODE_ENV === 'production') {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;
  if (cluster.isMaster) {

    console.log('CPU count', numCPUs);

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else {
    require('./node');
  }
} else {
  require('./node');
}
