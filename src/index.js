import { pushLink } from "./sql/pushlink.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const path = require("path")
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let filename="";

    if(req.url==="/") {
        filename = 'index.html'
    } else {
        filename = '404.html'
    }
    
    fs.readFile(filename, (err, data) => {
        if(err) {
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("Server Error");
            return;
        } else {
            res.writeHead(filename === '404.html' ? 404:200, {"content-type": "text/html"});
            res.end(data)
        }
    })
})

server.listen(80, () => {
        console.log("Server started at port 80");
    })

// pushLink("aaa", "https://www.youtube.com/watch?v=9xwnhDGOcyo&t=386s");

/*
document.getElementById('submit_link_button').addEventListener('click', function () {
    var value = document.getElementById('the_link').value;
    prompt(value)
});
*/
