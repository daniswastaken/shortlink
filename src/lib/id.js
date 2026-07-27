import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

// Generate 3-lowercase-alphabet ids
const IDS = [];
for (let i = 0; i < 26; i++) {
	for (let j = 0; j < 26; j++) {
		for (let k = 0; k < 26; k++) {
			IDS.push(
				String.fromCharCode(97 + i) +
				String.fromCharCode(97 + j) +
				String.fromCharCode(97 + k),
			);
		}
	}
}
Object.freeze(IDS);

const USED_IDS = new Set();

export function generateId() {
	for (const id of IDS) {
		if (!USED_IDS.has(id)) {
			USED_IDS.add(id);
			return id;
		}
	}
}

export function deleteId(id) {
	USED_IDS.delete(id);
}

// DEV

const db = new sqlite3.Database("shorten.db");
const sql = `INSERT INTO db(s_link, o_link, time) VALUES(?, ?, ?)`;

var s_var = generateId();
const o_url = "https://handaru.dev";
const curHour = 15;

try {
	// ID, original url, hour when the push happen
	await execute(db, sql, [s_var, o_url, curHour]);
} catch (err) {
	console.log(err);
} finally {
	db.close();
}
