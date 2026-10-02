let server;
const os =require('os');
const {exec} = require('child_process');

function getNetworkURL(PORT) {
    const net = Object.values(os.networkInterfaces())
    .flat()
  .find(i => i.family === 'IPv4' && !i.internal);
  return net ? `http://${net.address}:${PORT}/` : 'Unavailable';
};
// console.log(`\x1b[1;32m➜  Server:\x1b[0m ready in \x1b[1;37m ${timeTaken} ms\x1b[0;34m  http://localhost:${PORT}/\x1b[0m`);
// console.log(`\x1b[1;37m➜  Local:\x1b[36m    http://localhost:${PORT}/\x1b[0m`);
// if (db === "connected") {
//   console.log(`\x1b[1;37m➜  Database:  \x1b[33m   mongoose ${db}\x1b[0m`);
// }else{
//   console.log(`\x1b[1;37m➜  Network:\x1b[36m ${getNetworkURL(PORT)}\x1b[0m`);
// }

function printUI(PORT, db) {
  if (db === "Calling")console.clear();
  console.log(`\x1b[1;32m➜  Server:\x1b[0m runing in\x1b[34m http://localhost:${PORT}/ \x1b[1;37m➜ DB:\x1b[0m  ${db}\x1b[0m  `);
  if (db !== "Calling") console.log('   \x1b[2mPress \x1b[1;37mh + Enter\x1b[0m to show help\x1b[0m');
};

function showHelp() {
    console.log('\n\x1b[1mShortcuts\x1b[0m');
    console.log('press \x1b[1;37mr + enter\x1b[0m → restart the server');
    console.log('press \x1b[1;37mu + enter\x1b[0m → show server url');
    console.log('press \x1b[1;37mo + enter\x1b[0m → open in browser');
    console.log('press \x1b[1;37mc + enter\x1b[0m → clear console');
    console.log('press \x1b[1;37mq + enter\x1b[0m → quit\n');
};
function showURLs(PORT) {
    console.log(`\x1b[1;37m➜  Local:\x1b[36m    http://localhost:${PORT}/\x1b[0m`);
    console.log(`\x1b[1;37m➜  Network:\x1b[36m  ${getNetworkURL(PORT)}\x1b[0m`);
    
};
function openBrowser(PORT) {
    const url = `http://localhost:${PORT}/`;
        const cmd =
          process.platform === 'win32' ? `start ${url}` :
          process.platform === 'darwin' ? `open ${url}` :
          `xdg-open ${url}`;
        exec(cmd);
};
function clearTerminal() {
  const cmd =
    process.platform === 'win32'
      ? 'cls'
      : 'clear';

  exec(cmd, (err) => {
    if (err) console.clear();
  });
}; 
module.exports = {
    printUI,
    showHelp,
    showURLs,
    openBrowser,

}