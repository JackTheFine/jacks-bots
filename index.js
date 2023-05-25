
const app = require("express")();
var express = require("express")

app.get("/up/", (req, res) => res.json({ aridumL: true, uptime: new Date(Math.round(process.uptime()) * 1000).toISOString().slice(11, -5) }));
app.set("json spaces", 4);
app.use(express.static("public"));
require("./mybot/index.js")
>>>>>>> Stashed changes
try {
  app.listen(8080);
  console.log("Ready! (logged into JackTheFine.dev)");
} catch (error) {
  console.log("ERROR WITH SITE OPEN");
}
