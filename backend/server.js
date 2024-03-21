const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = express();
  const db = await connectDB();

  const allowedOrigins = [
    "http://localhost:5173",
    "https://code-snippet-frontend-vmi7.onrender.com",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  // add a new snippet
  app.post("/api/snippets/add", async (req, res) => {
    const { username, language, inputs, code } = req.body;

    if (!username || !language || !code) {
      res.status(400).send({
        error: "You must atleast add username, language, code in request body",
      });
    }

    const sqlQuery = `INSERT INTO ${process.env.DB_TABLE} (username, code_language, stdin, source_code, updated_at) VALUES (?, ?, ?, ?, NOW())`;
    db.query(sqlQuery, [username, language, inputs, code], (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(result);
      res.status(200).send({ message: "success" });
    });
  });

  // fetch all uploaded snippets
  app.get("/api/snippets/", async (req, res) => {
    const sql = "SELECT * FROM code_snippets";
    db.query(sql, (err, result) => {
      if (err) {
        console.log(`\nError in select query : ${err}\n`);
        throw err;
      }
      res.json(result);
    });
  });

  const server = app.listen(PORT, (err) => {
    if (err) {
      console.log(`\nError at app.listen : ${err}\n`);
      throw err;
    }
    console.log(`\nServer running at Port: ${PORT}\n`);
  });
};

startServer();
