import sqlite3 from "sqlite3";

import { execute } from "./sql/sql.js";

const main = async () => {
  const db = new sqlite3.Database("shorten.db");
  const sql = `INSERT INTO db(o_link, s_link, time) VALUES(?, ?, ?)`;
  try {
    await execute(db, sql, [15, 15, 24]);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};

main();

/*
// Function for pushing the link into DB
function pushLink() {
    
}

document.getElementById('submit_link_button').addEventListener('click', function() {
    var value = document.getElementById('the_link').value;
    prompt(value)
});
*/
