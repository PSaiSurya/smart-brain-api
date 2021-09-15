import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/register.js";
import signIn from "./controllers/signin.js";
import profile from "./controllers/profile.js";
import { image, apiCall } from "./controllers/image.js";

const app = express();

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "", //Your password
    database: "", //Your database name
  },
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json("Success");
});

app.get("/profile/:id", (req, res) => {
  profile(req, res, database);
});

app.post("/signin", (req, res) => {
  signIn(req, res, database, bcrypt);
});

app.post("/register", (req, res) => {
  register(req, res, database, bcrypt);
});

app.post("/imageurl", (req, res) => {
  apiCall(req, res);
});

app.put("/image", (req, res) => {
  image(req, res, database);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
