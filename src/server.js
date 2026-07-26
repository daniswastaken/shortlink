import path from "node:path";
import polka from "polka";
import sirv from "sirv";
import { generateId, deleteId } from "./lib/generate-id.js";

const map = new Map();
const app = polka();

app.use(sirv(path.join(import.meta.dirname, "public")));

app.post("/shorten", (request, response) => {
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

app.get("/:route", (request, response) => {
    // TODO: Handle redirect in here
    const { route } = request.params;
    const link = map.get(route);

    if (link === undefined) {
        response.writeHead(404);
    } else {
        response.writeHead(302, { Location: link });
    }

    response.end();
});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});
