const { network, memory, globalVersion, platformInfo } = require("./monitor");

const express = require("express");

const app = new express();

app.use(express.static("static"));

app.get("/info", async (req, res) => {
  let data = {
    network: await network(),
    memory: await memory(),
    versions: await globalVersion(),
    platform: await platformInfo()
  };

  res.send(data);
});

app.get("/update", async (req, res) => {
  let data = {
    memory: await memory(),
    time: Date.now()
  };

  res.send(data);
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("server start ");
});
