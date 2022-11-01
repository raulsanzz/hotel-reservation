import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
