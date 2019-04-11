const { network, memory, globalVersion, platformInfo } = require("./monitor");

const pm2 = require("./pm2");

const express = require("express");

const app = new express();

app.use(express.static("static"));

app.get("/sysinfo", async (req, res) => {
  let data = {
    network: await network(),
    memory: await memory(),
    versions: await globalVersion(),
    platform: await platformInfo(),
    pm_work: await pm2(),
    time: Date.now()
  };

  res.send(data);
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(5000, () => {
  console.log("server start ");
});
