'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('error', err => {
  console.error("connection error:", err);
});

db.once("open", () => {
  console.log('db connection successful');
  // All database communication goes here

  const schema = mongoose.Schema;
  const AnimalSchema = new mongoose.Schema({
    type: String,
    color: String,
    size: String,
    mass: Number,
    name: String
  });
  const Animal = new mongoose.model("Animal", AnimalSchema);

  const elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    size: 'big',
    mass: 6000,
    name: 'Lawrence'
  });

  elephant.save(err => {
    if (err) {
      console.error("Save failed with error:", err);
    } else {
      console.log("Saved!");
    }

    db.close(() => console.log("db connection closed."));
  });

});

