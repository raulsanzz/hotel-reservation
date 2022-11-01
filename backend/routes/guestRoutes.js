/**
 * Router build for Guest Routes
 *
 */

import express from "express";
const router = express.Router();
/** Importing specific functions from guestController. The Guest might get more complex in the future so only
 * using required fuctions
 */
import {
  createGuest,
  DeleteGuest,
  getGuest,
  getGuestById,
} from "../controllers/guestController.js";

/**Routes
 */
router.route("/create").post(createGuest);
router.route("/").get(getGuest);
router.route("/:id").get(getGuestById);
router.route("/delete/:id").delete(DeleteGuest);
/**End Routes
 */

export default router;
