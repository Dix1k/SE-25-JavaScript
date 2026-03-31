const express = require("express");
const log = console.log;
const users = require("./users.json");
const book = require("./book.json");

const HOST = "localhost",
  PORT = 3000;

const app = express();
