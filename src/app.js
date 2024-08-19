require('dotenv').config();
const express = require('express');
const swaggerSetup = require('../swagger');
const customerController = require('./controllers/customerController');
const { connectDB } = require('./models/index'); 


const app = express();
const PORT = process.env.PORT || 3000;

swaggerSetup(app);

app.use(express.json());

app.post('/creacliente', customerController.creaCliente);
app.get('/listclientes', customerController.listClientes);
app.get('/kpideclientes', customerController.kpideClientes);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });