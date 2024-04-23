import { Router } from "express";
import vehicleRoutes from "./components/Vehicles/routes";

const router = Router();

router.use("/vehicles", vehicleRoutes);

export default router;
