import mongoose from "mongoose";

const guestSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: true,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
