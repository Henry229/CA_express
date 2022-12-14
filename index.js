import express from 'express';

const categories = ['Food', 'Coding', 'Work', 'Other'];

const entries = [
  { category: 'Food', content: 'Hello' },
  { category: 'Coding', content: 'Express is cool' },
  { category: 'Work', content: 'we are done' },
  { category: 'Other', content: 'What else' },
];

const app = express();
const port = 4001;

app.use(express.json()); // 모든 아웃풋을 json format으로 바꿔준다.

app.get('/', (req, res) => res.send({ info: 'Journal API' }));
app.get('/categories', (req, res) => res.send(categories));
app.get('/entries', (req, res) => res.send(entries));
app.get('/entries/:id', (req, res) => {
  const entry = entries[req.params.id];
  entry && entry ? res.send(entry) : res.status(404).send('Entry not found');
});

app.post('/entries', (req, res) => {
  // 1. Create a new entry object with values passed in from the request
  const { category, content } = req.body;
  // Validation and sanitize
  const newEntry = { category, content };
  // 2. Push the new entry to the entries array
  entries.push(newEntry);
  // 3. Send the new entry with 201 status
  res.status(201).send(newEntry);
});

app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
