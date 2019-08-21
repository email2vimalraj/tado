const express = require('express');
const bodyParser = require('body-parser');
const Photon = require('@generated/photon');

const photon = new Photon.default();
const app = express();

app.use(bodyParser.json());

app.post(`/addtodo`, async (req, res) => {
  console.log(req.body);
  const result = await photon.todoItems.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.put(`/complete/:id`, async (req, res) => {
  const { id } = req.params;
  const todoitem = await photon.todoItems.update({
    where: { id },
    data: { completed: true },
  });
  res.json(todoitem);
});

app.get(`/allOpenTodos`, async (req, res) => {
  const todoItems = await photon.todoItems.findMany({
    where: { completed: false },
  });
  res.json(todoItems);
});

const server = app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000')
);
