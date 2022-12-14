import express from 'express';

const categories = ['Food', 'Coding', 'Work', 'Other'];

const app = express();
const port = 4001;

app.get('/', (req, res) => res.send({ info: 'Journal API' }));
app.get('/categories', (req, res) => res.status(200).send(categories));

app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
