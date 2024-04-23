import { Vehicle } from "src/components/Vehicles/models/Vehicle";
import mostRecentPriorState from "./mostRecentPriorQuery";

export interface StateLogRepository {
  getStateLogByDate(vehicleId: number, date: string): Promise<Vehicle | null>;
}

export default {
  getStateLogByDate: async (
    vehicleId: number,
    timestamp: string
  ): Promise<Vehicle | null> => {
    const res = await mostRecentPriorState(vehicleId, timestamp);
    if (!res?.length) return null;
    return res[0];
  },
} as StateLogRepository;
