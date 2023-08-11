require('dotenv').config()
const app = require('./app')

//* db import
const { db } = require("./database/config");
const initModel = require('./models/initModel');

//? database autentication
db.authenticate()
  .then(() => { console.log('database conected...') })
  .catch((error) => { console.log(error) })

initModel()

//? database synchronization
db.sync()
  .then(() => { console.log('database synchronized...') })
  .catch((error) => { console.log(error) })

app.listen(3000, () => {
  console.log("server runing on port 3000");
});