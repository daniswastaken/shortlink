import { pushLink } from "./lib/pushlink.js";

import path from "node:path";
import http from "node:http";
import fs from "node:fs";

const views = path.join(import.meta.dirname, "views");
const paragraphRegex = /<p>.+<\/p>/;

const readFileCache = new Map();
const readFile = (filepath, callback) => {
    if (readFileCache.has(filepath)) {
        return readFileCache.get(filepath);
    }

    fs.readFile(filepath, (error, result) => {
        if (error) {
            callback(error);
            return;
        }

        readFileCache.set(filepath, result);
        callback(null, result);
    });
};

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        let filename = req.url === "/" ? "index.html" : "404.html";

        readFile(path.join(views, filename), (error, data) => {
            if (error) {
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Server Error");
            } else {
                res.writeHead(filename === "404.html" ? 404 : 200, {
                    "content-type": "text/html",
                });
                res.end(data);
            }
        });

        return;
    } else if (req.method === "POST") {
        if (req.url === "/") {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                readFile(path.join(views, "index.html"), (error, data) => {
                    if (error) {
                        res.writeHead(500, { "content-type": "text/plain" });
                        res.end("Server Error");
                    } else {
                        res.writeHead(200, {
                            "content-type": "text/html",
                        });
                        res.end(
                            data
                                .toString()
                                .replace(paragraphRegex, `<p>My id</p>`),
                        );
                    }
                });
            });

            return;
        }
    }

    res.writeHead(405, { "content-type": "text/plain" });
    res.end(http.STATUS_CODES[405]);
});

server.listen(80, () => {
    console.log("Server started at port 80");
});
