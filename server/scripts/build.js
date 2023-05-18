const shelljs = require("shelljs");

shelljs.echo("--build start--");
shelljs.echo("clean cache");
shelljs.exec("yarn clean");
shelljs.rm("-rf", "static/static");
shelljs.rm("-rf", "static/asset-manifest.json");
shelljs.rm("-rf", "static/index.html");
shelljs.rm("-rf", "static/robots.txt");
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
shelljs.mv("build/*", "../server/static");
shelljs.echo("completed!");
shelljs.echo("start server with pm2");
shelljs.cd("../server");
if (!shelljs.which("pm2")) {
  shelljs.echo("start server require pm2");
  shelljs.exit(1);
}
shelljs.exec("pm2 stop all");
shelljs.exec("pm2 start dist/index.js");
shelljs.echo("--deploy completed--");
