const express = require('express');
const app = express();
const routers = require('./lib/routers');
const PORT = 3000;


app.use(express.json());
//app.use('/1',router);

app.listen(PORT,()=>{console.log(`Server listening on port ${PORT}.`);});