import Hotel from "../models/hotel.js";
import asyncHandler from "express-async-handler";
/** This function creates a Hotel
 */

const createHotel = asyncHandler(async (req, res) => {
  const { name, location, phone, email, status = "Active" } = req.body;

  if (!name || !location || !phone || !email) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const hotel = new Hotel({
      name,
      location,
      phone,
      email,
      status,
    });

    const createdHotel = await hotel.save();
    res.status(201).json({
      success: "true",
      action: "create",
      component: "hotel",
      id: createdHotel._id,
    });
  }
});

/** Gets All Hotels a simple find function
 */

const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.find({});
  if (!hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: "No List" });
  }
});

/** Get Hotel by it's ID in the params id is required /api/hotel/:id
 */

const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: "Hotel not found" });
  }

  res.json({
    success: "true",
    action: "get",
    component: "hotel",
    id: hotel._id,
  });
});

/** Remove Hotel sends the id with /api/hotel/delete/:id
 */
const removeHotel = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Hotel.findByIdAndUpdate(
      { _id: id },
      { status: "Deactive" },
      { new: true }
    );
    res.json({
      success: "true",
      action: "deletion",
      component: "hotel",
      id: id,
    });
  } catch (e) {
    res.json({
      success: "false",
      action: "deletion",
      component: "hotel",
      id: id,
    });
  }
});

export { createHotel, getHotel, getHotelById, removeHotel };
