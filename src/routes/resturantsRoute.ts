import { Router } from "express";
import {
  listResturants,
  listResturantById,
  addResturant,
  updateResturantById,
  deleteResturantById,
} from "../controllers/resturantsController";
import validationMiddleware from "../middleware/validationMiddleware";
import {
  validateInputString,
  validateInputFloat,
} from "../utils/inputValidators";
import { param } from "express-validator";
const resturantsRoutes = Router();

// This route lists all restaurants based on latitude and longitude
resturantsRoutes.get(
  "/",
  [
    validateInputFloat("latitude", -90, 90, false),
    validateInputFloat("longitude", -180, 180, false),
  ],
  validationMiddleware,
  listResturants
);

// This route lists a restaurant by its ID
resturantsRoutes.get(
  "/:id",
  [
    param("id")
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .withMessage("ID must be a positive integer"),
  ],
  validationMiddleware,
  listResturantById
);

resturantsRoutes.post(
  "/",
  [
    validateInputString("name"),
    validateInputString("address"),
    validateInputFloat("latitude", -90, 90),
    validateInputFloat("longitude"),
  ],
  validationMiddleware,
  addResturant
);

resturantsRoutes.put(
  "/:id",
  [
    param("id")
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .withMessage("ID must be a positive integer"),
    validateInputString("name").optional(),
    validateInputString("address").optional(),
    validateInputFloat("latitude", -90, 90).optional(),
    validateInputFloat("longitude").optional(),
  ],
  validationMiddleware,
  updateResturantById
);

resturantsRoutes.delete(
  "/:id",
  [
    param("id")
      .trim()
      .escape()
      .notEmpty()
      .isString()
      .withMessage("ID must be a positive integer"),
  ],
  validationMiddleware,
  deleteResturantById
);

export default resturantsRoutes;
