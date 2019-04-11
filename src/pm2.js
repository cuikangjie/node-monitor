var pm2 = require("pm2");

module.exports = function() {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) {
        reject();
        return;
      }

      pm2.list("all", (err, res) => {
        if (err) reject({});
        let result = res.map(({ name, pid, monit }) => ({
          name,
          pid,
          monit
        }));
        resolve(result);

        pm2.disconnect();
      });
    });
  });
};
