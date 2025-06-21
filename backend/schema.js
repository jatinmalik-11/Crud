const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    image: String,
})
const Menu =  mongoose.model('Menu', menuSchema);

module.exports = Menu;