const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

const { v4: uuidv4 } = require("uuid");

//id function   uuidv4();

//database connection

const pool = require("./db");

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT* FROM book");
    res.status(200).send({ message: "book was return", book: result.rows });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const result = await pool.query(`SELECT* FROM book WHERE id=$1`, [bookId]);
    res.status(200).send({ message: `ID BASE BOOK `, book: result.rows });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const id = uuidv4();
    const { name, description } = req.body;

    const result = await pool.query(
      `INSERT INTO book(id, name, description)
       VALUES($1, $2, $3)
       RETURNING *`,
      [id, name, description]
    );

    res.status(201).json({ message: "Book created", book: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM book WHERE id=$1", [id]);

    res
      .status(200)
      .send({ message: `book id is ready to delete  `, book: result.rows });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      "UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING*",
      [name, description, id]
    );

    res.status(200).send({ message: `book id is UPDATE`, book: result.rows });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.get("/", (req, res) => {
  res.send("server is Running");
});
app.listen(PORT, () => {
  console.log(`the server is running port ${PORT}`);
});
