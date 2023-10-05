import express, { Request, Response } from "express";
import Category, { ICategory } from "../models/category";
import * as categoryLogic from "../logic/category/logic";
export const categoryRouter = express.Router();

categoryRouter.use(express.json());

categoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const grocery = await categoryLogic.getCategoryById(id);
    if (grocery) {
      res.status(200).send(grocery);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const groceryArray = await categoryLogic.getAllCategories();
    if (groceryArray) {
      res.status(200).send(groceryArray);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document`);
  }
});
categoryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await categoryLogic.addCategory({ ...req.body });
    result
      ? res
          .status(201)
          .send(`Successfully created a new category with id ${result.id}`)
      : res.status(500).send("Failed to create a new category.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
categoryRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const result = await categoryLogic.updateCategory(id, { ...req.body });

    result
      ? res.status(200).send(`Successfully updated category with id ${id}`)
      : res.status(304).send(`category with id: ${id} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
categoryRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const result = await categoryLogic.deleteCategory(id);
    if (result) {
      res.status(202).send(`Successfully removed category with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove category with id ${id}`);
    } else if (!result) {
      res.status(404).send(`category with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
