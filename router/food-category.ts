import { Request, Response, Router } from "express";
import { FoodCategoryModel } from "../models/food-category";

export const foodCategoryRouter = Router()

foodCategoryRouter.get("/", async (req: Request, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});
foodCategoryRouter.post("/", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.send({
    message: "New category created",
    newItem,
  });
});

foodCategoryRouter.delete("/", async (req: Request, res: Response) => {
  const categoryJson = await FoodCategoryModel.findByIdAndDelete(
    "6784c2fea812ef1ac597b055"
  );
  res.send("Ene ustgagdsan shit");
  res.json(categoryJson);
});

foodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
  const updateId = req.params.id.trim();
  const updated = await FoodCategoryModel.findByIdAndUpdate(
    updateId,
    { categoryName: req.body.categoryName },
    { new: true }
  );
  res.json(updated);
});