import dayjs from "dayjs";
import { ExpressRouteFunc } from "../../../common/ExpressTypeRoute";
import { stateLogRepository } from "../../Statelogs";
import vehicleService, { VehicleService } from "../services/vehicleService";
import GetVehicle from "./GetVehicle";

describe("GetVehicle", () => {
  let mockNext: any;
  let mockResponse: any;

  beforeAll(() => {
    jest.mock("../../../config/logger/logger", () => ({
      info: jest.fn(),
      error: jest.fn(),
    }));
  });

  beforeEach(() => {
    mockResponse = {
      sendStatus: jest.fn(),
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
      json: jest.fn(() => mockResponse),
    };
    mockNext = jest.fn();
  });

  describe("Validating timestamp query param", () => {
    let service: VehicleService;
    let vehicleRoute: ExpressRouteFunc;

    beforeAll(() => {
      //mock StateLogs Repository
      jest.mock("../../Statelogs", () => ({
        StateLogRepository: jest.fn(() => ({
          getStateLogByDate: jest.fn(),
        })),
      }));

      jest.spyOn(stateLogRepository, "getStateLogByDate");

      service = vehicleService(stateLogRepository);

      vehicleRoute = GetVehicle(service);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("If ts query paramater comes and is a valid date with format YYYY-MM-DD HH:mm:ss respond normally", () => {
      const timestamp = "2021-01-01 20:00:00";

      const mockRequest: any = {
        params: { id: 1 },
        query: { ts: timestamp },
      };

      service.getVehicle = jest.fn().mockResolvedValue({ id: 1 });

      vehicleRoute(mockRequest, mockResponse)?.then(() => {
        expect(mockResponse.json).toHaveBeenCalledWith({ data: { id: 1 } });
      });
    });

    it("Malformed date returns 400 error Bad Request", () => {
      const timestamp = "2021-01-01 :00:00";

      const mockRequest: any = {
        params: { id: 1 },
        query: { ts: timestamp },
      };

      vehicleRoute(mockRequest, mockResponse)?.then(() => {
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Invalid timestamp format",
        });
        expect(service.getVehicle).not.toHaveBeenCalled();
      });
    });

    it("If no date is present use time.now", () => {
      const mockRequest: any = {
        params: { id: 1 },
        query: {},
      };

      service.getVehicle = jest.fn().mockResolvedValue({ id: 1 });

      const timeNow = new Date();
      const formattedTime = dayjs(timeNow).format("YYYY-MM-DD HH:mm:ss");

      vehicleRoute(mockRequest, mockResponse)?.then(() => {
        expect(service.getVehicle).toHaveBeenCalledWith(1, formattedTime);
        expect(mockResponse.json).toHaveBeenCalledWith({ data: { id: 1 } });
      });
    });
  });

  describe("Error Handling", () => {
    let service: VehicleService;
    let vehicleRoute: ExpressRouteFunc;

    beforeAll(() => {
      //mock StateLogs Repository
      jest.mock("../../Statelogs", () => ({
        StateLogRepository: jest.fn(() => ({
          getStateLogByDate: jest.fn(),
        })),
      }));

      jest.spyOn(stateLogRepository, "getStateLogByDate");

      service = vehicleService(stateLogRepository);

      vehicleRoute = GetVehicle(service);
    });

    it("If service throws error, should call next with error", () => {
      const timestamp = "2021-01-01 20:00:00";

      const mockRequest: any = {
        params: { id: 1 },
        query: { ts: timestamp },
      };

      service.getVehicle = jest
        .fn()
        .mockRejectedValue(new Error("CustomError"));

      vehicleRoute(mockRequest, mockResponse, mockNext)?.then(() => {
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.sendStatus).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error("CustomError"));
      });
    });
  });
});
