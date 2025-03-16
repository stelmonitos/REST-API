const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ednpoints

app.listen(8000, () =>{
    console.log('Server is running on port: 8000')
})