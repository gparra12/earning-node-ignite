import { response, Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

// create categories
categoriesRoutes.post("/", createCategoryController.handle);

// list all categories
categoriesRoutes.get("/", listCategoriesController.handle);

// import category file
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
