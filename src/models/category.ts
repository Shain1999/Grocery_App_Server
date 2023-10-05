import { Schema, model, connect } from "mongoose";

export interface ICategory {
  name: string;
}

const categroySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = model<ICategory>("Category", categroySchema);
export default Category;
