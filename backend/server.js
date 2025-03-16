const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://yonas:yonasJo.@cluster0.osmn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const DataModel = mongoose.model('Data', DataSchema);

app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
