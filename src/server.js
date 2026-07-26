import fs from "node:fs";
import path from "node:path";
import polka from "polka";
import sirv from "sirv";
import { generateId, deleteId } from "./lib/generate-id.js";

const map = new Map();

const publicDirectory = path.join(import.meta.dirname, "public");
const app = polka({ onNoMatch });

function onNoMatch(request, response) {
    fs.readFile(path.join(publicDirectory, "404.html"), (error, data) => {
        if (error) {
            response.writeHead(500, { "content-type": "text/plain" });
            response.end("Internal server error");
        } else {
            response.writeHead(404, { "content-type": "text/html" });
            response.end(data);
        }
    });
}

app.post("/", (request, response) => {
    let link = "";

    request.on("data", (chunk) => {
        link += chunk;
    });

    request.on("end", () => {
        // TODO: Handle route id creation in here
        const id = generateId();
        map.set(id, decodeURIComponent(link));

        response.writeHead(200, { "content-type": "text/plain" });
        response.end(id);
    });
});

app.use(sirv(publicDirectory));

app.get("/:route", (request, response) => {
    // TODO: Handle redirect in here
    const { route } = request.params;
    const link = map.get(route);

    if (link === undefined) {
        onNoMatch(request, response);
    } else {
        response.writeHead(302, { Location: link });
        response.end();
    }
});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});
