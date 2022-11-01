/**
 * Router build for Hotel Routes
 *
 */

import express from "express";
const router = express.Router();
/** Importing specific functions from hotelController. The Hotel might get more complex in the future so only
 * using required fuctions
 */
import {
  createHotel,
  getHotel,
  getHotelById,
  removeHotel,
} from "../controllers/hotelController.js";

/**Routes
 */
router.route("/create").post(createHotel);
router.route("/").get(getHotel);
router.route("/:id").get(getHotelById);
router.route("/delete/:id").delete(removeHotel);
/**End Routes
 */

export default router;
