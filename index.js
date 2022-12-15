import express from 'express';
import mongoose from 'mongoose';

const categories = ['Food', 'Coding', 'Work', 'Other'];

// const entries = [
//   { category: 'Food', content: 'Hello' },
//   { category: 'Coding', content: 'Express is cool' },
//   { category: 'Work', content: 'we are done' },
//   { category: 'Other', content: 'What else' },
// ];

mongoose
  .connect(
    'mongodb+srv://HenryCooper:cooper229@cluster0.ebcq3.mongodb.net/journal?retryWrites=true&w=majority'
  )
  .then((m) =>
    console.log(
      m.connection.readyState === 1
        ? 'Mongoose connected'
        : 'Mongoose not connected'
    )
  )
  .catch((err) => console.log(err));

// Create a Mongoose schema to define the structure of a model
const entrySchema = new mongoose.Schema({
  category: { type: String, required: true },
  content: { type: String, required: true },
});

//Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema);

const app = express();
const port = 4001;

app.use(express.json()); // 모든 아웃풋을 json format으로 바꿔준다.

app.get('/', (req, res) => res.send({ info: 'Journal API' }));
app.get('/categories', (req, res) => res.send(categories));
app.get('/entries', async (req, res) => res.send(await EntryModel.find()));
app.get('/entries/:id', async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id);
    entry && entry ? res.send(entry) : res.status(404).send('Entry not found');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/entries', async (req, res) => {
  try {
    // 1. Create a new entry object with values passed in from the request
    const { category, content } = req.body;
    // Validation and sanitize
    const newEntry = { category, content };
    // 2. Push the new entry to the entries array
    const insertedEntry = await EntryModel.create(newEntry);
    // 3. Send the new entry with 201 status
    res.status(201).send(insertedEntry);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
