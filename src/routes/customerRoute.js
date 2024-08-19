const express = require('express');
const Customer = require('../models/customerModel');
const router = express.Router();

// POST /creacliente
router.post('/creacliente', async (req, res) => {
  const { nombre, apellido, edad, fechaNacimiento } = req.body;
  try {
    const customer = await Customer.create({ nombre, apellido, edad, fechaNacimiento });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /kpideclientes
router.get('/kpideclientes', async (req, res) => {
  try {
    const clients = await Client.findAll();
    const ages = clients.map(client => client.age);
    const avgAge = ages.reduce((acc, age) => acc + age, 0) / ages.length;
    const variance = ages.reduce((acc, age) => acc + Math.pow(age - avgAge, 2), 0) / ages.length;
    const stdDev = Math.sqrt(variance);

    res.json({ averageAge: avgAge, stdDev });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /listclientes
router.get('/listclientes', async (req, res) => {
  try {
    const clients = await Client.findAll();
    const lifeExpectancy = 80; // as an example

    const clientsWithDeathDate = clients.map(client => {
      const estimatedDeathDate = new Date(client.birthDate);
      estimatedDeathDate.setFullYear(estimatedDeathDate.getFullYear() + lifeExpectancy);
      return {
        ...client.toJSON(),
        estimatedDeathDate,
      };
    });

    res.json(clientsWithDeathDate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;