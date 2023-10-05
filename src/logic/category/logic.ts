import Category, { ICategory } from "../../models/category";

export const getCategoryById = async (id: String) => {
  const category = await Category.findById(id);
  return category;
};
export const getAllCategories = async () => {
  const categoryArray = await Category.find({});
  return categoryArray;
};
export const addCategory = async (categoryObj: ICategory) => {
  const newCategory = new Category(categoryObj);
  const result = await newCategory.save();
  return result;
};
export const updateCategory = async (id: String, categoryObj: ICategory) => {
  const updatedCategory = new Category(categoryObj);
  await Category.updateOne({ id }, updatedCategory);
  const result = await Category.findById(id);
  return result;
};
export const deleteCategory = async (id: String) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};
