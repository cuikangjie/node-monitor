const si = require("systeminformation");

/**
 * 网卡信息
 * @type {[type]}
 */
module.exports.network = function network() {
  return si
    .networkInterfaces()
    .then(data => {
      return data.filter(item => item.ip4 !== "127.0.0.1")[0];
    })
    .catch(() => {});
};

/**
 * 内存使用信息
 *
 * total 总内存
 * free  未使用
 * used  已使用
 */
module.exports.memory = function memory() {
  return si.mem().catch(() => ({}));
};

/**
 * 全局变量 的版本号
 *
 * node java ...
 * @return {[type]} [description]
 */
module.exports.globalVersion = function globalVersion() {
  return si.versions().catch(() => {});
};

/**
 * 系统信息
 * @return {[type]} [description]
 */
module.exports.platformInfo = function platformInfo() {
  return si
    .osInfo()
    .then(({ platform, distro }) => ({
      platform,
      distro
    }))
    .catch((err) => ({
      platform: "",
      distro: ""
    }));
};
