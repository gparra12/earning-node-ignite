import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// create specification
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
