import { Router } from "express";
import { stateLogRepository } from "../Statelogs";
import GetVehicle from "./controllers/GetVehicle";
import VehicleService from "./services/vehicleService";

const vehicleRoutes = Router();

const vehicleService = VehicleService(stateLogRepository);

vehicleRoutes.get("/:id", GetVehicle(vehicleService));

export default vehicleRoutes;
