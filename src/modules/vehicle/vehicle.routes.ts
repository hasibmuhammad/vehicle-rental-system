import { Router } from "express";
import auth from "../../middleware/auth";
import validate from "../../middleware/validate";
import { vehicleController } from "./vehicle.controller";
import { createVehicleSchema, updateVehicleSchema } from "./vehicle.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validate(createVehicleSchema),
  vehicleController.createVehicle,
);

router.get("/", vehicleController.getVehicles);

router.get("/:vehicleId", vehicleController.getVehicle);

router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

router.put(
  "/:vehicleId",
  auth("admin"),
  validate(updateVehicleSchema),
  vehicleController.updateVehicle,
);

export const vehicleRoutes = router;
