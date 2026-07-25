import { pushLink } from "./sql/pushlink.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const http = require("http");
const fs = require("fs");



pushLink("aaa", "https://www.youtube.com/watch?v=9xwnhDGOcyo&t=386s");

/*
document.getElementById('submit_link_button').addEventListener('click', function () {
    var value = document.getElementById('the_link').value;
    prompt(value)
});
*/
