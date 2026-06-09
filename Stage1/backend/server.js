const express = require('express');
const app = express();
const routes = require('./routes/route');
const cors = require('cors');
app.use(cors());


app.use('/', routes);

// for json parsing
app.use(express.json());

// this will mount all the routes starting with '/'


app.listen(3000, ()=>{
  console.log("Application running on http://localhost:3000");
})