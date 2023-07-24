const app = require('./app')

//* db import
const { db } = require("./database/config");

//? database autentication
db.authenticate()
  .then(() => { console.log('database conected...') })
  .catch((error) => { console.log(error) })

//? database synchronization
db.sync()
  .then(() => { console.log('database synchronized...') })
  .catch((error) => { console.log(error) })

app.listen(3000, () => {
  console.log("server runing on port 3000");
});