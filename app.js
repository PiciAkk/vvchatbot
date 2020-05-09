const http = require('http');
const url = require('url');
const { exec } = require("child_process");
http.createServer(function (request, response) {
    const queryObject = url.parse(request.url,true).query;
    console.log(queryObject);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("");
    exec("env MESSAGE=" + queryObject.text, (error, stdout, stderr) => {
    exec('export MESSAGE="' + queryObject.text + '"', (error, stdout, stderr) => {
    if (error) {
      console.log(`Hiba! ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderror: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
    });
    exec("chmod +x " + __dirname + "/log.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Hiba! ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderror: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
    });
    exec(__dirname + "/log.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Hiba! ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderror: ${stderr}`);
      return;
    }
      console.log(`stdout: ${stdout}`);
    });
}).listen(8000);

console.log('A szerver fut: http://localhost:8000/');
