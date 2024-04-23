import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { ExpressRouteFunc } from "../../../common/ExpressTypeRoute";
import logger from "../../../config/logger/logger";
import { VehicleService } from "../services/vehicleService";

function dateIsValid(timestamp: string): boolean {
  //Validate if timestamp is format YYYY-MM-DD HH:mm:ss
  const date = new Date(timestamp);
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return (
    date instanceof Date && !isNaN(date.getTime()) && regex.test(timestamp)
  );
}

function getCurrentDate(): string {
  const date = new Date();
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export default function GetVehicle(
  vehicleService: VehicleService
): ExpressRouteFunc {
  return async (req: Request, res: Response, next?: NextFunction) => {
    const params = req.params;
    const query = req.query;

    try {
      logger.info({ params, query }, "GetVehicle controller");
      //Validate the request if query

      const id = Number(params.id);
      const timestamp = (query?.ts || getCurrentDate()) as string;

      if (!dateIsValid(timestamp)) {
        logger.error({ timestamp }, "Invalid timestamp format");
        res.status(400).json({
          message: "Invalid timestamp format",
        });
        return;
      }

      const vehicle = await vehicleService.getVehicle(id, timestamp);

      logger.info({ vehicle }, "GetVehicle controller response");
      res.json({ data: vehicle });
    } catch (error) {
      logger.error({ error, params, query }, "Error GetVehicle");
      next?.(error);
    }
  };
}
