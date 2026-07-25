import sqlite3 from "sqlite3";

import { execute } from "./sql.js";

// Function for pushing the link into DB
export async function pushLink(o_url, time) {
    const db = new sqlite3.Database("shorten.db");
    const sql = `INSERT INTO db(o_link, s_link, time) VALUES(?, ?, ?)`;
    try {
        await execute(db, sql, [o_url, 15, time]);
    } catch (err) {
        console.log(err);
    } finally {
        db.close();
    }
}