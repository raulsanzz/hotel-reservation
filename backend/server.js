import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import guestRoutes from './routes/guestRoutes.js'
import hotelRoutes from "./routes/hotelRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/reservation", reservationRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/guest", guestRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
