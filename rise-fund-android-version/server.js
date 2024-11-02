// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { executeProcedure } = require('./database/databaseService');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/executeProcedure', async (req, res) => {
  const { procedureName, params } = req.body;

  try {
    const result = await executeProcedure(procedureName, params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error ejecutando el procedimiento almacenado', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
