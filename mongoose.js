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
    type: { type: String, default: "goldfish" },
    color: { type: String, default: "small" },
    size: { type: String, default: "golden" },
    mass: { type: Number, default: 0.007 },
    name: { type: String, default: 'Angela' }
  });
  const Animal = new mongoose.model("Animal", AnimalSchema);

  const elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    size: 'big',
    mass: 6000,
    name: 'Lawrence'
  });

  const animal = new Animal({});

  const whale = new Animal({
    type: "whale",
    size: "big",
    mass: 190500,
    name: "Fig"
  });

  Animal.deleteMany({}, (err) => {
    elephant.save(err => {
      if (err) console.error("Save failed with error:", err);
  
      animal.save(() => {
        if (err) console.error("Save failed with error:", err);

        whale.save(() => {
          if (err) console.error("Save failed with error:", err);
          
          Animal.find({size: "big"}, (err, animals) => {

            if (err) console.error("Save failed with error:", err);
            
            animals.forEach(animal => {
              console.log(animal.name + "the " + animal.color + " " + animal.type);
            });

            db.close(() => console.log("db connection closed."));
          });
        });
      });
    });
  });
});

