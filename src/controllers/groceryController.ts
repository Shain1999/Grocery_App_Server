import express, { Request, Response } from "express";
import Grocery, { IGrocery } from "../models/grocery";
import * as groceryLogic from "../logic/grocery/logic";
export const groceryRouter = express.Router();

groceryRouter.use(express.json());

groceryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const grocery = await groceryLogic.getGroceryById(id);

    if (grocery) {
      res.status(200).send(grocery);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

groceryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const groceryArray = await groceryLogic.getAllGroceries();
    if (groceryArray) {
      res.status(200).send(groceryArray);
    }
  } catch (error) {
    res.status(404).send(`Unable to find matching document`);
  }
});
groceryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await groceryLogic.addGrocery({ ...req.body });
    result
      ? res
          .status(201)
          .send(`Successfully created a new grocery with id ${result.id}`)
      : res.status(500).send("Failed to create a new grocery.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
groceryRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const result = await groceryLogic.updateGrocery(id, { ...req.body });

    result
      ? res.status(200).send(`Successfully updated grocery with id ${id}`)
      : res.status(304).send(`Grocery with id: ${id} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
groceryRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    const result = await groceryLogic.deleteGrocery(id);
    if (result) {
      res.status(202).send(`Successfully removed grocery with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove grocery with id ${id}`);
    } else if (!result) {
      res.status(404).send(`grocery with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
