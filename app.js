const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS package
require('dotenv').config();
const { sendMail } = require('./controllers/contact');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());  // Use CORS middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST Request Sending Email
app.post('/send-email', sendMail);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});