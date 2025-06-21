const mongoose = require('mongoose');
const schema = require("../schema");
const data = require("./data");

main()
.then((res) => {
    console.log(res);
    console.log("Connection built successfully");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/form');
}

const insertData = async () => {
    await schema.deleteMany();
    await schema.insertMany(data.data);
    console.log("Data initialized into the server");
}

insertData();