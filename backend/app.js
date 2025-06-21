const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const schema = require("./schema");
const cors = require('cors');
const sendEnquiryEmail = require('./mail')

main()
  .then(() => console.log("Database initialized successfully"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/form');
}

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await schema.find();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//Add
app.post('/admin', async (req, res) => {
  try {
    const newItem = await schema.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send("Failed to create item");
  }
});

//Email
app.post('/', async (req, res) => {
  try {
    await sendEnquiryEmail();
    res.status(200).json({ message: 'Enquiry email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send enquiry email' });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

