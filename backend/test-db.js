const mongoose = require('mongoose');

const uri = 'mongodb+srv://ace:Ashishtiwari_2003@ace-trial-project.9cp9j16.mongodb.net/foodbridge';

mongoose.connect(uri, { family: 4 })
  .then(() => {
    console.log("Connection successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
    process.exit(1);
  });
