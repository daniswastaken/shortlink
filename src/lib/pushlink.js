import sqlite3 from "sqlite3";

import { execute } from "./sql.js";

// Function for pushing the link into DB
export async function pushLink(o_url, time) {
	const db = new sqlite3.Database("shorten.db");
	const sql = `INSERT INTO db(s_link, o_link, time) VALUES(?, ?, ?)`;
	try {
		await execute(db, sql, ['aaa', o_url, time]);
	} catch (err) {
		console.log(err);
	} finally {
		db.close();
	}
}
