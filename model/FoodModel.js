/* This model is used by:
 * ./routes/foodRouter.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const foodSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

//Create Model - the model is called 'food' the collection is assumed to be the pluralised form, foods
const FoodModel = mongoose.model("food", foodSchema);
module.exports = FoodModel;