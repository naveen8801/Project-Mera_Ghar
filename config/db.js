const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log(`Connected to db`.blue.bold);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
