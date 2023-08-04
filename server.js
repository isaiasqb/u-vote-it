// import express
const express = require('express');
const db = require('./database/connection');
const apiRoutes = require('./routes/apiRoutes');

//add PORT designation & app expression
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ enconded: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes)

// DEFAULT reponse for any other requests (Not Found) - ALWAYS last call or it will override others
app.use((req, res) => {
  res.status(404).end();
})


//Start server after DB Connection
db.connect(err => {
  if (err) throw err;
  console.log("Database Connected")
  
  //function that will start the Express.js server on port 3001.
  app.listen(PORT, () => {
    console.log(`You have summoned a new server for the ULTIMA SUPREME election on port ${PORT}`)
  });

});  


