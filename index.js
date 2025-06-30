const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

const { v4: uuidv4 } = require('uuid');

//id function   uuidv4();

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    res.status(200).send({ message: "user are return" });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    res.status(200).send({ message: `book id is ${bookId}` });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const id=uuidv4();
    const { name, description } = req.body;

    res.status(200).send({ message: `book  ${id}  ${name} and ${description}` });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});


app.delete("/books/:id", async (req, res) => {
  try {
    const id=req.params.id

    res.status(200).send({ message: `book id is ready to delete ${id} ` });
  } catch (error) {
    res.send({ error: "error.message" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id=req.params.id
   res.status(200).send({ message: `book id is ${name} and ${description} ${id}` });
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
