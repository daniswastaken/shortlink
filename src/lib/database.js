import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { USED_IDS, generateId } from "./id.js";

const db = new DatabaseSync(
	path.join(import.meta.dirname, "..", "..", "shorten.db"),
);
const DAY = 24 * 60 * 60 * 1000;

/**
 * Refresh the USED_IDS state based on the database.
 * @return {void}
 */
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

/**
 * Add link to database and return an id.
 * @param {string} link
 * @return {string | null}
 */
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

/**
 * Get the link from the id.
 * @param {string} id
 * @return {string | null}
 */
export function getLink(id) {
	refresh();
	const row = db.prepare("SELECT o_link FROM db WHERE s_link = ?").get(id);
	return row?.o_link ?? null;
}
