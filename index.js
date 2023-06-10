const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/info", (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const entry = request.body;

  if (
    entry.name === null ||
    entry.name === "" ||
    entry.name === undefined ||
    entry.number === null ||
    entry.number === "" ||
    entry.number === undefined
  ) {
    response.status(400).json({ error: "name or number cannot be empty" });
  } else if (persons.find((p) => p.name === entry.name)) {
    response.status(400).json({ error: "name must be unique" });
  } else {
    const newId = Math.floor(Math.random() * 999999 + 1);

    entry.id = newId;
    persons = persons.concat(entry);
    response.status(201).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    response.status(404).end();
  } else {
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});