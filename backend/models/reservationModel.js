import mongoose from "mongoose";

const reservationSchema = mongoose.Schema({
  reservationId: {
    type: String,
    require: true,
  },
  arrivalDate: {
    type: String,
    require: true,
  },
  departureDate: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "active",
  },
  baseStayAmount: {
    type: Number,
    require: true,
  },
  taxAmount: {
    type: Number,
    require: true,
  },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
