import fs from "node:fs";
import path from "node:path";
import polka from "polka";
import sirv from "sirv";
import { addLink, getLink, refresh } from "./lib/database.js";

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
		const id = addLink(decodeURIComponent(link));
		if (id == null) {
			response.writeHead(507, { "content-type": "text/plain" });
			response.end("All IDs are used, please try again after 24 hours");
		} else {
			response.writeHead(200, { "content-type": "text/plain" });
			response.end(id);
		}
	});
});

app.use(sirv(publicDirectory));

app.get("/:route", (request, response) => {
	const link = getLink(request.params.route);

	if (link == null) {
		onNoMatch(request, response);
	} else {
		response.writeHead(302, { Location: link });
		response.end();
	}
});

app.listen(8080, () => {
	refresh();
	console.log("Server started at port 8080");
});
