import { ObjectId } from "mongodb";
import { Schema, model, connect } from "mongoose";

export interface IGrocery {
  name: string;
  quantity: number;
  updatedAt: Date;
  createdAt: Date;
}
// 2. Create a Schema corresponding to the document interface.
const grocerySchema = new Schema<IGrocery>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  updatedAt: { type: Date, default: () => Date.now() },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const Grocery = model<IGrocery>("Grocery", grocerySchema);
export default Grocery;
