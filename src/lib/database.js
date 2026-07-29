import { DatabaseSync } from "node:sqlite";
import { USED_IDS, generateId, deleteId } from "./id.js";

const db = new DatabaseSync("shorten.db");
const DAY = 24 * 60 * 60 * 1000;

export function refresh() {
	const rows = db.prepare("SELECT * FROM db").all();
	for (const row of rows) {
		if (Date.now() > row.time + DAY) {
			db.prepare("DELETE FROM db WHERE s_link = ?").run(row.s_link);
			USED_IDS.delete(row.s_link);
		} else {
			USED_IDS.add(row.s_link);
		}
	}
}

export function addLink(link) {
	refresh();
	const id = generateId();
	if (id) {
		db.prepare("INSERT INTO db(s_link, o_link, time) VALUES(?, ?, ?)").run(
			id,
			link,
			Date.now(),
		);
		USED_IDS.add(id);
		return id;
	} else {
		return null;
	}
}

export function getLink(id) {
	refresh();
	const row = db.prepare("SELECT o_link FROM db WHERE s_link = ?").get(id);
	return row?.o_link ?? null;
}
