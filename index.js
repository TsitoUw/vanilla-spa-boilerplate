const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 1080;

http
  .createServer((req, res) => {
    const filePath = path.join(__dirname, "", req.url === "/" ? "index.html" : req.url);
    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".ico":
        contentType = "image/x-ico";
        break;
      case ".svg":
        contentType = "image/svg";
        break;
    }

    const extensions = [".js", ".css", ".png", ".jpg", ".ico", ".svg"];
    let dest = (extensions.find(()=>extname) == undefined || req.url == "/") ? "index.html" : req.url ;
    fs.readFile(path.join(__dirname, "", dest), (err, data) => {
      if(err){
        res.writeHead(err.code == "ENOENT" ? 404 : 400, {"Content-Type": 'text/plain'});
        res.end(err.message ? err.message : err)
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8"); 
    });
  })
  .listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
