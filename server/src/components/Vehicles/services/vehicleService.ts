import { StateLogRepository } from "../../Statelogs";
import { Vehicle } from "../models/Vehicle";

export interface VehicleService {
  getVehicle(id: number, timestamp: string): Promise<Vehicle | null>;
}

export default function vehicleService(
  stateLogRepository: StateLogRepository
): VehicleService {
  return {
    getVehicle: async (
      id: number,
      timestamp: string
    ): Promise<Vehicle | null> => {
      const res = await stateLogRepository.getStateLogByDate(id, timestamp);
      return res;
    },
  } as VehicleService;
}
