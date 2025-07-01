import sanitizeHtml from "sanitize-html";
import { ResturantModel } from "../config/db";
import calculateDistance from "../utils/calculateDistance";

const listResturants = async function (req, res) {
  try {
    const latitude: number = sanitizeHtml(req.query.latitude);
    const longitude: number = sanitizeHtml(req.query.longitude);

    const resturants = await ResturantModel.find({}).select(
      "-createdAt -updatedAt"
    ); // find all resturants
    if (!resturants || resturants.length === 0) {
      return res.status(404).json({ message: "no resturant found" });
    }

    res.status(200).json({
      message: "resturant listed successfully",
      data: resturants.sort(
        (a, b) =>
          calculateDistance(latitude, longitude, a.latitude, a.longitude) -
          calculateDistance(latitude, longitude, b.latitude, b.longitude)
      ), // sort by distance between the restaurant and the user distance, ascending order
    });
  } catch (error) {
    console.error("error listing resturant:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const listResturantById = async function (req, res) {
  try {
    const id: string = sanitizeHtml(req.params.id);

    const resturant = await ResturantModel.findById(id).select(
      "-createdAt -updatedAt"
    ); // find resturant by id
    if (!resturant) {
      return res.status(404).json({ message: "resturant not found" });
    }

    res.status(200).json({
      message: "resturant found successfully",
      data: resturant,
    });
  } catch (error) {
    console.error("error listing resturant by id:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const addResturant = async function (req, res) {
  try {
    const name: string = sanitizeHtml(req.body.name);
    const address: string = sanitizeHtml(req.body.address);
    const latitude: number = sanitizeHtml(req.body.latitude);
    const longitude: number = sanitizeHtml(req.body.longitude);

    const resturantInserted = await ResturantModel.create({
      name,
      address,
      latitude,
      longitude,
    });
    if (!resturantInserted) {
      return res.status(500).json({ message: "failed to add resturant" });
    }

    res.status(201).json({
      message: "Resturant added successfully",
      data: resturantInserted,
    });
  } catch (error) {
    console.error("error adding Resturant:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const updateResturantById = async function (req, res) {
  try {
    const id: string = sanitizeHtml(req.params.id);
    const name: string = sanitizeHtml(req.body.name);
    const address: string = sanitizeHtml(req.body.address);
    const latitude: number = sanitizeHtml(req.body.latitude);
    const longitude: number = sanitizeHtml(req.body.longitude);
    const fieldsToUpdate: {
      name?: string;
      address?: string;
      latitude?: number;
      longitude?: number;
    } = {
      name,
      address,
      latitude,
      longitude,
    };
    if (name) {
      fieldsToUpdate.name = name;
    } else if (address) {
      fieldsToUpdate.address = address;
    } else if (latitude) {
      fieldsToUpdate.latitude = latitude;
    } else if (longitude) {
      fieldsToUpdate.longitude = longitude;
    } else {
      return res.status(400).json({ message: "no fields to update" });
    }

    const resturantUpdated = await ResturantModel.findByIdAndUpdate(
      id,
      { name, address, latitude, longitude },
      { new: true }
    ).select("-createdAt -updatedAt"); // find resturant by id and update it, don't return createdAt and updatedAt fields
    if (!resturantUpdated) {
      return res.status(404).json({ message: "resturant not found" });
    }

    res.status(200).json({
      message: "resturant updated successfully",
      data: resturantUpdated,
    });
  } catch (error) {
    console.error("error updating resturant by id:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteResturantById = async function (req, res) {
  try {
    const id: string = sanitizeHtml(req.params.id);

    const resturantDeleted = await ResturantModel.findByIdAndDelete(id); // find resturant by id and delete it
    if (!resturantDeleted) {
      return res.status(404).json({ message: "resturant not found" });
    }

    res.status(204).send(); // no content, successful deletion
  } catch (error) {
    console.error("error deleting resturant by id:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export {
  addResturant,
  listResturants,
  listResturantById,
  updateResturantById,
  deleteResturantById,
};
