import Grocery, { IGrocery } from "../../models/grocery";

export const getGroceryById = async (id: String) => {
  const grocery = (await Grocery.findById(id)).populate("category");
  return grocery;
};
export const getAllGroceries = async () => {
  const groceryArray = await Grocery.find({}).populate("category");
  return groceryArray;
};
export const addGrocery = async (groceryObj: IGrocery) => {
  const newGrocery = new Grocery(groceryObj);
  const result = await newGrocery.save();
  return result;
};
export const updateGrocery = async (id: String, groceryObj: IGrocery) => {
  const updatedGrocery = new Grocery(groceryObj);
  await Grocery.updateOne({ id }, updatedGrocery);
  const result = await Grocery.findById(id);
  return result;
};
export const deleteGrocery = async (id: String) => {
  const result = await Grocery.findByIdAndDelete(id);
  return result;
};
