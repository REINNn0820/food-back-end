import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { mongo } from "mongoose";
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();
let cluster: any = null;
const connectMongoDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Succesfully connected");
  } catch (error) {
    console.log("failed", error);
  }
};

connectMongoDb();

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

const FoodCategoryModel = mongoose.model(
  "Food-category",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);

app.get("/food-category", async (req: Request, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});
app.post("/food-category", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.send({
    message: "New category created",
    newItem,
  });
});

app.delete("/food-category", async (req: Request, res: Response) => {
  const categoryJson = await FoodCategoryModel.findByIdAndDelete(
    "6784c2fea812ef1ac597b055"
  );
  res.send("Ene ustgagdsan shit");
  res.json(categoryJson);
});

app.put("/food-category/:id", async (req: Request, res: Response) => {
  const updateId = req.params.id.trim();
  const updated = await FoodCategoryModel.findByIdAndUpdate(
    updateId,
    { categoryName: req.body.categoryName },
    { new: true }
  );
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
