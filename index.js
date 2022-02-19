//Librerias
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/routes');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
 
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Api para probar que este arriba el servidor
app.get('/', (req, res) => {
  res.send('Hola mundo!')
})

//Rutas para los endpoints 
app.use('/api/v1', routes);

//Puerto donde se levanta el servidor
app.listen(3000, () => {
  console.log(`Servidor run!! http://localhost:${3000}`)
})