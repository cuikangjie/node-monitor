const { network, memory, globalVersion, platformInfo } = require("./monitor");

const pm2 = require("./pm2");

module.exports = async () => {
  return {
    network: await network(),
    memory: await memory(),
    versions: await globalVersion(),
    platform: await platformInfo(),
    pm_work: await pm2(),
    time: Date.now()
  };
};
