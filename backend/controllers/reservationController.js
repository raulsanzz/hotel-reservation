import Reservation from "../models/reservationModel.js";
import asyncHandler from "express-async-handler";
import Guest from "../models/guest.js";
/** This function creates a Reservation
 */

const CreateReservation = asyncHandler(async (req, res) => {
  const {
    reservationId,
    guestMemberId,
    guestName,
    hotelName,
    arrivalDate,
    departureDate,
    status,
    baseStayAmount,
    taxAmount,
  } = req.body;

  if (
    !reservationId ||
    !guestMemberId ||
    !guestName ||
    !hotelName ||
    !arrivalDate ||
    !departureDate ||
    !status ||
    !baseStayAmount ||
    !taxAmount
  ) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const reservation = new Reservation({
      reservationId,
      guestMemberId,
      guestName,
      hotelName,
      arrivalDate,
      departureDate,
      status,
      baseStayAmount,
      taxAmount,
    });

    const createdReservation = await reservation.save();

    res.status(201).json({
      success: "true",
      action: "create",
      component: "reservation",
      id: createdReservation._id,
    });
  }
});

/** Gets All Reservation a simple find function
 */

const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.find({});
  if (reservation) res.json(reservation);
  else res.status(404).json({ message: "No List" });
});

/** Get Reservation by it's ID in the params id is required /api/reservation/:id
 */

const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: "Reservation not found" });
  }
});

/** Remove Reservation sends the id with /api/reservation/delete/:id
 */

const CancelReservation = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const stat = req.body.status;

  const data = await Reservation.findByIdAndUpdate(
    { _id: id },
    { status: stat },
    { new: true }
  );

  res.json({
    success: "true",
    action: "cancel Reservation",
    component: "reservation",
    id: id,
  });
});

/** Retrieving Guest Stay Summary  /api/reservation/summary/stay
 */

const RetrievingGuestStaySummary = asyncHandler(async (req, res) => {
  const reservation = await Reservation.find({});

  // guest member id
  const guestId = await Guest.find();
  const memberId = guestId.map((res) => {
    return res._id;
  });


  // comming stays

  const comingStays = await Reservation.find({ status: "active" });
  const test = comingStays.map((res) => {
    let date = new Date(res.arrivalDate);
    let data1 = new Date(res.departureDate);

    let getTimes = data1.getTime() - date.getTime();

    let TotalDays = Math.ceil(getTimes / (1000 * 3600 * 24));
    return TotalDays;
  });

  const totalNight = test.reduce((a, b) => a + b, 0);
  // total number of nights

  // Total upcoming stay amount
  const baseamount = reservation.map((res) => {
    return res.baseStayAmount;
  });

  const tax = reservation.map((res) => res.taxAmount);

  const totalBase = baseamount.reduce((partialSum, a) => partialSum + a, 0);
  const totalTax = tax.reduce((partialSum, a) => partialSum + a, 0);

  // past stay info

  const pastStays = await Reservation.find({ status: "done" });

  const PastNight = pastStays.map((res) => {
    let date = new Date(res.arrivalDate);
    let data1 = new Date(res.departureDate);

    let getTimes = data1.getTime() - date.getTime();

    let TotalDays = Math.ceil(getTimes / (1000 * 3600 * 24));
    return TotalDays;
  });

  const totalPastNight = PastNight.reduce((a, b) => a + b, 0);

  // past total stay amount

  const pastTotalAmount = await Reservation.find({ status: "done" });

  const totalAmount = pastTotalAmount.map((res) => {
    return res.baseStayAmount;
  });

  const taxx = pastTotalAmount.map((res) => {
    return res.taxAmount;
  });

  const pastTotal = totalAmount.reduce((partialSum, a) => partialSum + a, 0);
  const pastTax = taxx.reduce((partialSum, a) => partialSum + a, 0);

  // cancel stay info

  const cancelStayinfo = await Reservation.find({ status: "cancelled" });

  res.send({
    guestMemberId: memberId,
    upcomingStayInfo: {
      upcomingStays: comingStays.length,
      totalNights: totalNight - 1,
      totalStayAmount: totalBase + totalTax,
    },
    pastStaysInfo: {
      numberOfPastStays: pastStays.length,
      totalNightInPastStays: totalPastNight - 1,
      pastStayAmount: pastTotal + pastTax,
    },
    cancelledStay: {
      cancelReservation: cancelStayinfo.length,
    },
    totalStayAmount: totalBase + totalTax,
  });
});

/** Delete Reservation sends the id with /api/reservation/delete/:id
 */

const DeleteReservation = asyncHandler(async (req, res) => {
  const reqeust = await Reservation.findById(req.params.id);

  if (reqeust) {
    await reqeust.remove();
    res.json({ message: "Reservation Deleted" });
  } else {
    res.status(404);
    throw new Error("Reservation Not Found");
  }
});

const SearchReservation = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date);
  const salutation = await Reservation.find({
    arrivalDate: { $gt: date },
  });

  res.json({
    data: salutation,
  });
});

export {
  getReservation,
  getReservationById,
  CreateReservation,
  DeleteReservation,
  SearchReservation,
  CancelReservation,
  RetrievingGuestStaySummary,
};
