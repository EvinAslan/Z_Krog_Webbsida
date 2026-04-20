var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // Krävs för kommunikation med React 
const app = express();

// Importera rutter enligt arkitekturdiagrammet 
var productRoutes = require('./routes/productRoutes');
var settingsRoutes = require('./routes/settingsRoutes');


// Middleware
app.use(cors()); // Tillåter anrop från din frontend 
app.use(logger('dev'));
app.use(express.json()); // Krävs för att ta emot JSON i POST/PUT
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/dist')));

// API-rutter enligt specifikation 
app.use('/api/products', productRoutes); // Hanterar CRUD för produkter
app.use('/api/settings', settingsRoutes); // Hanterar inställningar (öppettider)
// Enkel felhantering 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Något gick fel i servern!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

module.exports = app;

