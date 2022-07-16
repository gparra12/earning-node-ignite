import { response, Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

// create categories
categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

// list all categories
categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

// import category file
categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
