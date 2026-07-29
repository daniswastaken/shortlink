import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

const db = new sqlite3.Database("shorten.db");
const sql = `INSERT INTO db(s_link, o_link, time) VALUES(?, ?, ?)`;

let sql_l = `SELECT s_link FROM db`;

var USED_IDS = new Set();

// Generate 3-lowercase-alphabet ids
var IDS = [];
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

export function generateId() {
	db.all(sql_l, [], (err, rows) => {
		if (err) {
			throw err;
		}
		rows.forEach((row) => {
			console.log(`Add '${row.s_link}' from DB`)
			USED_IDS.add(row.s_link);
		});

		console.log(USED_IDS);
	});

	for (const id of IDS) {
		if (!USED_IDS.has(id)) {
			console.log(id);
			return id;
		}
	}
}

export function deleteId(id) {
	USED_IDS.delete(id);
}

// DEV
// console.log(USED_IDS)
generateId();
// var s_var = generateId();

// console.log(`Next ID: ${s_var}`);
// USED_IDS.add(s_var)
// console.log(USED_IDS)

/*
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
*/
