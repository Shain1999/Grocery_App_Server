import { ObjectId } from "mongodb";
import mongoose, { Schema, model, connect } from "mongoose";
import Category, { ICategory } from "./category";

export interface IGrocery {
  name: string;
  quantity: number;
  category: ICategory;
  updatedBy: ObjectId;
  quantityType: string;
  updatedAt: Date;
  createdAt: Date;
}
// 2. Create a Schema corresponding to the document interface.
const grocerySchema = new Schema<IGrocery>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  updatedAt: { type: Date, default: () => Date.now() },
  quantityType: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Grocery = model<IGrocery>("Grocery", grocerySchema);
export default Grocery;
