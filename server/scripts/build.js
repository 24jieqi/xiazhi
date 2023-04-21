const shelljs = require("shelljs");

shelljs.echo("--build start--");
shelljs.echo("clean cache");
shelljs.exec("yarn clean");
shelljs.rm("-rf", "views/static");
shelljs.rm("-rf", "views/asset-manifest.json");
shelljs.rm("-rf", "views/index.html");
shelljs.rm("-rf", "views/robots.txt");
shelljs.echo("completed!");
shelljs.echo("generate & build server");
shelljs.exec("yarn");
shelljs.exec("yarn build");
shelljs.echo("completed!");
shelljs.echo("build web application");
shelljs.cd("../client");
shelljs.exec("yarn");
shelljs.rm("-rf", "build");
shelljs.exec("yarn build");
shelljs.mv("build/*", "../server/views");
shelljs.echo("completed!");
shelljs.echo("start server with pm2");
shelljs.cd("../server");
if (!shelljs.which("pm2")) {
  shelljs.echo("start server require pm2");
  shelljs.exit(1);
}
shelljs.exec("pm2 start dist/index.js");
shelljs.echo("--deploy completed--");
