import express from "express";
import { globalMiddleware, errorHandler } from "./middleware/globalMiddleware";
import resturantsRoutes from "./routes/resturantsRoute";
import { createConnection } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(globalMiddleware); // this middleware will be executed for every request
try {
  (async function () {
    // this will create a connection to the database
    await createConnection();
  })(); // IIFE to handle async connection in the top-level code
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1); // Exit the process if the database connection fails
}
app.get("/api/v1/", function (req, res) {
  res.json({ message: "Mystrey-Bag API" });
});

app.use("/api/v1/resturants", resturantsRoutes); // this has the routes for the resturants

app.use(errorHandler); // if any unxpected synchronous error occurs, this middleware will catch it

app.listen(PORT, function () {
  console.log("Server is running on port", PORT);
});
