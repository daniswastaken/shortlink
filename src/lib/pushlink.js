import sqlite3 from "sqlite3";

import { execute } from "./sql.js";

// Function for pushing the link into DB
export async function pushLink(o_url) {
	let time = new Date();
	let curHour = time.getHours();
	console.log(curHour);

	const db = new sqlite3.Database("shorten.db");
	const sql = `INSERT INTO db(s_link, o_link, time) VALUES(?, ?, ?)`;
	try {
		// ID, original url, hour when the push happen
		await execute(db, sql, ['aaa', o_url, curHour]);
	} catch (err) {
		console.log(err);
	} finally {
		db.close();
	}
}
