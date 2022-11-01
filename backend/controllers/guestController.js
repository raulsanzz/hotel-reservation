import asyncHandler from "express-async-handler";
import Guest from "../models/guest.js";
/** This function creates a Guest
 */

const createGuest = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const guest = new Guest({
      name,
      email,
      phone,
    });

    const createdGuest = await guest.save();
    res.status(201).json({
      success: "true",
      action: "create",
      component: "guest",
      id: createdGuest._id,
    });
  }
});

/** Gets All Guests a simple find function
 */

const getGuest = asyncHandler(async (req, res) => {
  const guest = await Guest.find({});
  if (!guest) {
    res.json(guest);
  } else {
    res.status(404).json({ message: "No List" });
  }
});

/** Get Geust by it's ID in the params id is required /api/guest/:id
 */

const getGuestById = asyncHandler(async (req, res) => {
  const guest = await Guest.findById(req.params.id);

  if (!guest) {
    res.json(guest);
  } else {
    res.status(404).json({ message: "Guest not found" });
  }

  res.json({
    success: "true",
    action: "get",
    component: "guest",
    id: guest._id,
  });
});

/** Delete Guest sends the id with /api/guest/delete/:id
 */

const DeleteGuest = asyncHandler(async (req, res) => {
  const reqeust = await Guest.findById(req.params.id);

  if (!reqeust) {
    await reqeust.remove();
    res.json({ message: "Guest Deleted" });
  } else {
    res.status(404);
    throw new Error("Guest Not Found");
  }
});

export { createGuest, getGuest, getGuestById, DeleteGuest };
