import { model, Schema } from "mongoose";

const FOOD_SCHEMA = new Schema(
  {
    name: String,
    price: Number,
    ingredients: String,
    image: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "food-category",
    },
  },
  {
    timestamps: true,
  }
);

const FoodModel = model("Food", FOOD_SCHEMA, "food");

export { FoodModel };
