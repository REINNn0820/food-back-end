"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const food_category_1 = require("./router/food-category");
const food_1 = require("./router/food");
const user_1 = require("./router/user");
const food_order_1 = require("./router/food-order");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5001;
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
(0, dotenv_1.configDotenv)();
let cluster = null;
const connectMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        yield mongoose.connect(MONGODB_URI);
        console.log("Succesfully connected");
    }
    catch (error) {
        console.log("failed", error);
    }
});
connectMongoDb();
app.use("/food-category", food_category_1.foodCategoryRouter);
app.use("/food", food_1.foodRouter);
app.use("/food-order", food_order_1.FoodOrderRouter);
app.use("/user", user_1.UserRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
